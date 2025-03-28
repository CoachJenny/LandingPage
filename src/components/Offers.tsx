import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { coachingOffers } from '../data/content';

// Composants d'icônes définis comme des composants React
const IconSparkles = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <path 
      d="M12 3c0 0-3 6-3 8s1 3 3 3 3-1 3-3-3-8-3-8z" 
      className="fill-accent"
    />
    <path 
      d="M12 14v7M9 16l1 1M15 16l-1 1" 
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <circle cx="8" cy="6" r="1" className="fill-accent-light" />
    <circle cx="16" cy="6" r="1" className="fill-accent-light" />
    <circle cx="6" cy="10" r="1" className="fill-accent-light" />
    <circle cx="18" cy="10" r="1" className="fill-accent-light" />
  </svg>
);

const IconWave = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <path
      d="M4 12C6 8 8 6 12 6C16 6 18 8 20 12"
      className="stroke-accent"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M4 16C6 12 8 10 12 10C16 10 18 12 20 16"
      className="stroke-accent-light"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M4 8C6 4 8 2 12 2C16 2 18 4 20 8"
      className="stroke-accent"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconLightning = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <path 
      d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" 
      className="stroke-accent" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="1.5"
    />
  </svg>
);

// Map des icônes avec les composants React
const icons = {
  Sparkles: IconSparkles,
  Wave: IconWave,
  Lightning: IconLightning
};

export const Offers: React.FC = () => {
  return (
    <section id="offers" className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-light/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-display mb-6 text-white">Des accompagnements pensés pour que tu bouges (pour de vrai).</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Chaque parcours est unique. Lequel résonne avec ce que tu veux ?
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {coachingOffers.map((offer, index) => {
            const Icon = icons[offer.icon as keyof typeof icons];
            
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-light/20 rounded-2xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden h-full flex flex-col border border-white/10 transform transition-all duration-300 group-hover:-translate-y-2">
                  {/* En-tête */}
                  <div className="p-6 border-b border-white/10">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                      {Icon && <Icon />}
                    </div>
                    
                    <h3 className="text-2xl font-display text-white mb-3">{offer.title}</h3>
                    <p className="text-white/80 h-[3.6rem] flex items-center leading-snug">
                      {offer.description}
                    </p>
                  </div>

                  {/* Corps de la carte */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    {/* Format et durée */}
                    <div>
                      <div className="text-white/90 mb-1">{offer.format}</div>
                      <p className="text-white/70 mb-6">Durée : {offer.duration}</p>
                      
                      {/* Liste des bénéfices */}
                      <ul className="space-y-3 mb-6">
                        {offer.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-start text-white/80">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0" />
                            <span className="leading-tight">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prix et bouton */}
                    <div>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-accent-light">{offer.price}</div>
                        {offer.id === "etincelle" && (
                          <div className="text-xs text-white/60 mt-1">
                            *Maximum 1 par personne / par semestre
                          </div>
                        )}
                      </div>

                      <Link 
                        to={`/offres/${offer.id}`}
                        className="block w-full"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 px-4 rounded-xl text-primary font-semibold
                            bg-gradient-to-r from-accent to-accent-light
                            hover:from-accent-light hover:to-accent
                            transition-all duration-300 shadow-lg hover:shadow-xl
                            flex items-center justify-center space-x-2"
                        >
                          <span>Découvrir le programme</span>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};