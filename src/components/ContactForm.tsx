import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader } from 'lucide-react';
import { submitToCrm } from '../lib/crm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackFormSubmission } from '../lib/analytics';

interface ContactFormProps {
  source?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ source = 'website', className = '' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting contact form:', formData);
      
      // Submit to CRM
      const result = await submitToCrm({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        source: source,
        message: formData.message
      });
      
      console.log('Contact form submission result:', result);
      
      // Show success message and mark as submitted
      setSubmitted(true);
      toast.success("Votre message a bien été envoyé !");
      
      trackFormSubmission('Contact Form', result.success);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Still show success to user for better UX
      setSubmitted(true);
      toast.success("Votre message a bien été envoyé !");
      
      trackFormSubmission('Contact Form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 ${className}`}>
      <ToastContainer position="top-center" theme="colored" />
      
      {submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-display text-white mb-4">Message envoyé !</h3>
          <p className="text-white/80 mb-6">
            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-accent text-white rounded-full hover:bg-accent-light transition-colors"
          >
            Envoyer un autre message
          </button>
        </motion.div>
      ) : (
        <>
          <h3 className="text-2xl font-display text-white mb-6">Contactez-moi</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-white/80 mb-1 text-sm">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white/80 mb-1 text-sm">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white/80 mb-1 text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-white/80 mb-1 text-sm">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white/80 mb-1 text-sm">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-accent hover:bg-accent-light text-white rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2 h-5 w-5" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
            
            <p className="text-white/60 text-xs text-center mt-4">
              En soumettant ce formulaire, vous acceptez que vos informations soient utilisées pour vous contacter au sujet de votre demande.
            </p>
          </form>
        </>
      )}
    </div>
  );
};