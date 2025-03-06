import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { coachingOffers } from '../data/content';
import { ArrowLeft, Check, Clock, Calendar, Users, Target, ArrowRight } from 'lucide-react';

export const OfferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const offer = coachingOffers.find(o => o.id === id);
  const [selectedOption, setSelectedOption] = useState(0);

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="text-center">
          <h2 className="text-3xl font-display mb-6">Programme non trouvé</h2>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-full
              hover:bg-white/90 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Function to render text with WhatsApp links
  const renderWithWhatsAppLinks = (text: string) => {
    if (!text.includes('WhatsApp')) return text;
    
    const parts = text.split(/(Suivi WhatsApp)/g);
    return parts.map((part, index) => {
      if (part === 'Suivi WhatsApp') {
        return (
          <HashLink 
            key={index} 
            to="/#whatsapp-faq" 
            className="text-accent-light hover:underline"
          >
            {part}
          </HashLink>
        );
      }
      return part;
    });
  };

  // Custom content based on offer ID
  let customContent = {
    description: "",
    process: [],
    forWhom: []
  };

  if (id === "etincelle") {
    customContent = {
      description: "Une séance intensive pour identifier ce qui vous freine et amorcer le changement. Idéal pour découvrir le coaching narratif et ouvrir de nouvelles perspectives.",
      process: [
        "Questionnaire préparatoire pour maximiser notre temps ensemble",
        "Séance de 60 minutes en visioconférence",
        "Document de synthèse pour ancrer vos prises de conscience",
        "Option : Suivi WhatsApp pendant 1 semaine",
        "Option : Call de suivi une semaine après"
      ],
      forWhom: [
        "Vous souhaitez expérimenter le coaching narratif",
        "Vous avez un blocage spécifique à explorer",
        "Vous cherchez une première mise en mouvement"
      ]
    };
  } else if (id === "lightwave") {
    customContent = {
      description: "Un programme en 5 séances pour dépasser ce qui vous freine et créer un changement durable. Une approche progressive, qui vous permet d'explorer, d'ancrer et d'avancer avec clarté.",
      process: [
        "5 séances de 90 min en visioconférence",
        "Documentation narrative pour ancrer vos prises de conscience",
        "Exercices narratifs sélectionnés spécialement pour vous",
        "Option : Inventaire EQ-i et débriefing: 169€",
        "Option : Suivi WhatsApp entre les séances 110€"
      ],
      forWhom: [
        "Vous voulez avancer en profondeur, sans solution toute faite",
        "Vous êtes prêt·e à investir du temps et de l'énergie dans ce travail",
        "Vous cherchez un accompagnement structuré et progressif"
      ]
    };
  } else if (id === "lightning") {
    customContent = {
      description: "Un accompagnement en 10 séances pour transformer en profondeur votre leadership et votre rapport à vous-même. Un espace exigeant et soutenant, conçu pour aller au bout de votre réflexion, affiner votre posture et créer un impact durable.",
      process: [
        "10 séances individuelles de coaching",
        "Documentation narrative pour ancrer vos prises de conscience",
        "Suivi WhatsApp tout au long du programme*",
        "Inventaire EQ-i Leadership",
        "2 séances de débriefing spécifiques"
      ],
      forWhom: [
        "Vous voulez aller au bout de votre transformation",
        "Vous cherchez un accompagnement structurant et exigeant",
        "Vous voulez développer un leadership aligné, impactant et fluide"
      ]
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux offres
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display mb-6 text-white">
              {offer.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {customContent.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column - Main content */}
          <div className="md:col-span-2 space-y-12">
            {/* Process section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg"
            >
              <h2 className="text-2xl font-display mb-6 flex items-center text-white">
                <Clock className="w-6 h-6 mr-3 text-accent-light" />
                Déroulement du programme
              </h2>
              <div className="space-y-4">
                {customContent.process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-white font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-white/90 pt-1">
                      {renderWithWhatsAppLinks(step)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* For whom section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg"
            >
              <h2 className="text-2xl font-display mb-6 flex items-center text-white">
                <Users className="w-6 h-6 mr-3 text-accent-light" />
                Pour qui ?
              </h2>
              <div className="space-y-4">
                {customContent.forWhom.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-accent-light mr-4 flex-shrink-0 mt-1" />
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Benefits section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg"
            >
              <h2 className="text-2xl font-display mb-6 flex items-center text-white">
                <Target className="w-6 h-6 mr-3 text-accent-light" />
                Bénéfices
              </h2>
              <div className="space-y-4">
                {offer.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-accent rounded-full mr-4 mt-2 flex-shrink-0" />
                    <p className="text-white/90">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right column - Sticky pricing card */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="sticky top-8"
            >
              <div className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">
                <h3 className="text-xl font-semibold mb-6 text-white">Options disponibles</h3>
                <div className="space-y-4">
                  {offer.id === "etincelle" ? (
                    <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-lg text-white">Essentiel</h4>
                        <span className="text-2xl font-bold text-accent-light">150€*</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>Séance de 60 min</span>
                        </li>
                        <li className="flex items-start text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>Trace narrative</span>
                        </li>
                      </ul>
                      <div className="text-xs text-white/60 mt-2 italic">
                        *Maximum 1 par personne / par semestre
                      </div>
                    </div>
                  ) : offer.id === "lightwave" ? (
                    <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-lg text-white">Programme complet</h4>
                        <span className="text-2xl font-bold text-accent-light">1500€</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>5 séances</span>
                        </li>
                        <li className="flex items-start text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>Documentation narrative</span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      {offer.options.map((option, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-white/10 border border-white/20"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-lg text-white">{option.title}</h4>
                            <span className="text-2xl font-bold text-accent-light">{option.price}</span>
                          </div>
                          <ul className="space-y-2">
                            {option.includes.map((item, i) => (
                              <li key={i} className="flex items-start text-sm text-white/80">
                                <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                                <span>{renderWithWhatsAppLinks(item)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <a
                    href="https://calendly.com/jennifer-perrault/call-decouverte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-xl text-white font-semibold
                      bg-gradient-to-r from-accent to-accent-light
                      hover:from-accent-light hover:to-accent
                      transition-all duration-300 shadow-md hover:shadow-lg
                      flex items-center justify-center space-x-2"
                  >
                    <span>Réserver mon échange gratuit</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>

                  <p className="text-sm text-white/70 text-center mt-4">
                    Premier échange offert et sans engagement
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};