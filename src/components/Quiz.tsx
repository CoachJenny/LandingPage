import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { initialQuestion, getNextQuestion, getSynthesis } from '../data/content';
import { ArrowRight, Sparkles, Loader } from 'lucide-react';
import { submitToCrm } from '../lib/crm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackQuizAnswer, trackQuizCompletion, trackFormSubmission, trackEvent } from '../lib/analytics';

interface ContactInfo {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

const offerDisplayNames: Record<string, string> = {
  'etincelle': 'Étincelle',
  'lightwave': 'Lightwave',
  'lightning': 'Lightning'
};

export const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    firstName: '',
    lastName: ''
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSynthesis, setShowSynthesis] = useState(false);
  const [synthesis, setSynthesis] = useState<{
    mainText: string;
    recommendedOffer: 'etincelle' | 'lightwave' | 'lightning';
  } | null>(null);
  const [showOfferCTA, setShowOfferCTA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  // Redirection automatique après affichage des CTAs
  useEffect(() => {
    if (showOfferCTA) {
      // Définir un timer pour rediriger vers la section Promise après 30 secondes
      const timer = window.setTimeout(() => {
        // Scroll vers la section Promise
        const promiseSection = document.querySelector('section:nth-of-type(2)');
        if (promiseSection) {
          promiseSection.scrollIntoView({ behavior: 'smooth' });
          
          // Réinitialiser l'état du quiz après le scroll
          setTimeout(() => {
            setAnswers({});
            setShowContactForm(false);
            setShowSynthesis(false);
            setShowOfferCTA(false);
            setCurrentQuestion(initialQuestion);
            setSubmissionAttempted(false);
          }, 1000);
        }
      }, 30000); // 30 secondes
      
      setRedirectTimer(timer);
      
      return () => {
        if (redirectTimer) window.clearTimeout(redirectTimer);
      };
    }
  }, [showOfferCTA]);

  // Nettoyer le timer lors du démontage du composant
  useEffect(() => {
    return () => {
      if (redirectTimer) window.clearTimeout(redirectTimer);
    };
  }, [redirectTimer]);

  const handleAnswer = (answer: string) => {
    try {
      const newAnswers = { ...answers, [Object.keys(answers).length]: answer };
      setAnswers(newAnswers);
      
      // Track the answer
      trackQuizAnswer(
        Object.keys(answers).length + 1,
        currentQuestion.question,
        answer
      );
      
      if (Object.keys(newAnswers).length < 3) {
        const nextQuestion = getNextQuestion(newAnswers);
        setCurrentQuestion(nextQuestion);
      } else {
        setShowContactForm(true);
      }
    } catch (error) {
      console.error('Error handling answer:', error);
      setHasError(true);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionAttempted(true);
    
    try {
      // Get synthesis before submitting to CRM
      const quizSynthesis = getSynthesis(answers);
      setSynthesis(quizSynthesis);
      
      // Track quiz completion
      trackQuizCompletion(quizSynthesis.recommendedOffer);
      
      // Log the quiz data for debugging
      console.log('Quiz Data:', {
        answers,
        contactInfo,
        recommendedOffer: quizSynthesis.recommendedOffer,
        timestamp: new Date().toISOString()
      });
      
      // Submit to CRM
      try {
        const result = await submitToCrm({
          email: contactInfo.email,
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          phone: contactInfo.phone,
          quizResponses: answers,
          recommendedOffer: quizSynthesis.recommendedOffer,
          source: 'Quiz'
        });
        
        console.log('CRM submission result:', result);
        
        // Show success message
        setShowContactForm(false);
        setShowSynthesis(true);
        toast.success("Merci pour vos réponses !");
        
        trackFormSubmission('Quiz Contact Form', result.success);
        
        // Show offer CTA after a short delay
        setTimeout(() => {
          setShowOfferCTA(true);
        }, 1000);
      } catch (crmError) {
        console.error('Error submitting to CRM:', crmError);
        
        // Still show synthesis to user for better UX
        setShowContactForm(false);
        setShowSynthesis(true);
        toast.success("Merci pour vos réponses !");
        
        trackFormSubmission('Quiz Contact Form', false);
        
        // Show offer CTA after a short delay
        setTimeout(() => {
          setShowOfferCTA(true);
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
      setHasError(true);
      
      trackFormSubmission('Quiz Contact Form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => (
    <>
      <h3 className="text-2xl md:text-3xl font-display mb-8 text-white">
        {currentQuestion.question}
      </h3>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            className="w-full p-6 text-left rounded-xl bg-white/95 hover:bg-white 
              text-primary hover:text-primary-light font-medium shadow-lg hover:shadow-xl
              transition-all duration-300"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </>
  );

  const renderContactForm = () => (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
      onSubmit={handleContactSubmit}
    >
      <div className="text-center mb-8">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-white" />
        <h3 className="text-2xl md:text-3xl font-display text-white mb-4">
          Une dernière étape...
        </h3>
        <p className="text-white/90 max-w-md mx-auto">
          Laisse-moi tes coordonnées pour recevoir une proposition d'accompagnement personnalisée.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          value={contactInfo.firstName}
          onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
          placeholder="Prénom"
          required
          className="p-4 bg-white/95 rounded-xl focus:bg-white focus:ring-2 
            focus:ring-white/50 transition-all duration-300 placeholder:text-gray-500
            text-primary"
        />
        <input
          type="text"
          name="lastName"
          value={contactInfo.lastName}
          onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
          placeholder="Nom"
          required
          className="p-4 bg-white/95 rounded-xl focus:bg-white focus:ring-2 
            focus:ring-white/50 transition-all duration-300 placeholder:text-gray-500
            text-primary"
        />
      </div>

      <input
        type="email"
        name="email"
        value={contactInfo.email}
        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
        placeholder="Email"
        required
        className="w-full p-4 bg-white/95 rounded-xl focus:bg-white focus:ring-2 
          focus:ring-white/50 transition-all duration-300 placeholder:text-gray-500
          text-primary"
      />

      <input
        type="tel"
        name="phone"
        value={contactInfo.phone}
        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
        placeholder="Téléphone"
        required
        className="w-full p-4 bg-white/95 rounded-xl focus:bg-white focus:ring-2 
          focus:ring-white/50 transition-all duration-300 placeholder:text-gray-500
          text-primary"
      />

      <button
        type="submit"
        disabled={isSubmitting || submissionAttempted}
        className="w-full py-4 px-8 bg-primary text-white rounded-xl 
          transition-all duration-500 font-semibold text-lg 
          shadow-lg hover:shadow-xl transform hover:scale-[1.02]
          hover:bg-primary-light disabled:opacity-70 disabled:cursor-not-allowed
          flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin mr-2 h-5 w-5" />
            Traitement en cours...
          </>
        ) : submissionAttempted ? (
          "Formulaire envoyé"
        ) : (
          "Recevoir ma proposition personnalisée"
        )}
      </button>
      
      <p className="text-white/70 text-sm text-center">
        En soumettant ce formulaire, vous acceptez que vos informations soient utilisées pour vous contacter au sujet de votre demande.
      </p>
    </motion.form>
  );

  const renderSynthesis = () => {
    if (!synthesis) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <div className="text-center mb-8">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-white" />
          <h3 className="text-2xl md:text-3xl font-display text-white mb-4">
            Merci {contactInfo.firstName} !
          </h3>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-white/90 leading-relaxed">
            {synthesis.mainText}
          </p>
        </div>

        {showOfferCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <h4 className="text-xl md:text-2xl font-display text-white mb-8">
              D'après tes réponses, découvre l'accompagnement fait pour toi
            </h4>
            <div className="flex flex-col items-center space-y-4">
              <Link 
                to={`/offres/${synthesis.recommendedOffer}`}
                className="inline-flex items-center px-8 py-4 bg-white text-primary 
                  text-lg font-semibold rounded-full transition-all duration-500 transform 
                  hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => {
                  // Annuler le timer de redirection si l'utilisateur clique sur un CTA
                  if (redirectTimer) {
                    window.clearTimeout(redirectTimer);
                    setRedirectTimer(null);
                  }
                  
                  trackEvent('CTA', 'Click', `Quiz Result - ${synthesis.recommendedOffer}`);
                }}
              >
                Découvrir le programme {offerDisplayNames[synthesis.recommendedOffer] || synthesis.recommendedOffer}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a 
                href="https://calendly.com/jennifer-perrault/call-decouverte"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-accent text-white 
                  text-lg font-semibold rounded-full transition-all duration-500 transform 
                  hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => {
                  // Annuler le timer de redirection si l'utilisateur clique sur un CTA
                  if (redirectTimer) {
                    window.clearTimeout(redirectTimer);
                    setRedirectTimer(null);
                  }
                  
                  trackEvent('CTA', 'Click', 'Quiz Result - Calendly');
                }}
              >
                Réserver un appel découverte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              
              <p className="text-white/60 text-sm mt-4">
                Vous serez automatiquement redirigé dans 30 secondes...
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderErrorState = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 className="text-2xl font-display text-white mb-4">Oups ! Une erreur est survenue</h3>
      <p className="text-white/80 mb-6">
        Nous rencontrons un problème technique. Veuillez rafraîchir la page et réessayer.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-white text-primary rounded-full hover:bg-white/90 transition-colors"
      >
        Rafraîchir la page
      </button>
    </div>
  );

  return (
    <section id="quiz" className="min-h-screen bg-gradient-to-br from-accent via-accent to-accent-light py-20">
      <ToastContainer position="top-center" theme="colored" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-gradient-to-br from-primary/90 to-primary rounded-2xl 
            shadow-2xl p-8 md:p-12 backdrop-blur-sm"
        >
          {hasError ? renderErrorState() : (
            <>
              {!showContactForm && !showSynthesis && (
                <div className="mb-8">
                  <div className="w-full bg-white/20 rounded-full h-2 mb-8">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((Object.keys(answers).length + 1) / 3) * 100}%` }}
                    />
                  </div>
                  {renderQuestion()}
                </div>
              )}

              {showContactForm && renderContactForm()}
              {showSynthesis && renderSynthesis()}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};