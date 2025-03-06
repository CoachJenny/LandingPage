import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent via-accent to-accent-light relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display text-center mb-16 text-white">À propos de moi</h2>
            
            <div className="flex flex-col items-center">
              {/* Photo centrée */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group mb-10 max-w-xs"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-2xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <img
                  src="https://static.wixstatic.com/media/cd3c1f_57647e95c89843259802a92eac7694b7~mv2.jpeg/v1/fill/w_1258,h_1920,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/cd3c1f_57647e95c89843259802a92eac7694b7~mv2.jpeg"
                  alt="Portrait professionnel de coach"
                  className="rounded-2xl shadow-2xl object-cover aspect-[3/4] w-full transform transition-all duration-500 group-hover:scale-105"
                />
              </motion.div>
              
              {/* Texte en séquence linéaire */}
              <div className="space-y-6 w-full">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-white/90 leading-relaxed mb-4">
                    J'ai longtemps cru qu'avancer, c'était cocher des cases.
                    Les bonnes études. La bonne carrière. La bonne stratégie. Même si ce n'était pas complètement "moi".
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    J'ai suivi le plan. 15 ans dans la finance et la transformation, à structurer, optimiser, décider. J'appréciais ça. 
                    Je n'avais juste jamais pensé à questionner ces cases, pas compris que je pouvais en écrire de nouvelles.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white/90 leading-relaxed mb-4">
                    Et puis, j'ai moi-même été accompagnée.
                    <br />
                    J'ai découvert l'effet catalyseur du coaching, ce moment où une question bien placée fait tout basculer.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    J'ai compris que je m'appliquais déjà depuis des années à questionner et créer du mouvement, en manquant encore du cadre, de la posture et des outils, rigoureux et indispensables, pour accompagner avec justesse et puissance.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-white/90 leading-relaxed">
                    J'ai inspiré, et je suis partie les chercher.
                    <br />
                    Trois ans déjà, et le chemin ne cesse d'évoluer.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-8"
                >
                  <a
                    href="https://calendly.com/jennifer-perrault/call-decouverte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-light 
                      text-white text-lg font-semibold rounded-full transition-all transform 
                      hover:scale-105 shadow-lg hover:shadow-xl group"
                  >
                    <span className="mr-2">💡</span>
                    <span>Si ça vous parle, on en parle ?</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};