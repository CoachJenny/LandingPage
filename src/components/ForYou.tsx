import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Phone, ThumbsUp, ThumbsDown } from 'lucide-react';

export const ForYou: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-light to-primary relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-light/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Premier encadré - C'est pour toi si */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-accent/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full flex flex-col"
            >
              {/* Effet de lueur positive */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-light/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <span className="text-2xl mr-2">👉</span> C'est pour toi si :
                  </h3>
                  <ThumbsUp className="w-6 h-6 text-accent-light" />
                </div>
                
                <ul className="space-y-4 flex-1">
                  {[
                    "Tu tournes en rond avec la sensation qu'un truc t'échappe.",
                    "Tu veux avancer avec clarté, sans t'enfermer dans une case.",
                    "Tu as tout essayé (articles, méthodes, formations)… et pourtant.",
                    "Tu veux comprendre ce qui te freine, mais autrement.",
                    "Tu es prêt.e à libérer les voiles, à rencontrer ta créativité, ton inspiration.",
                    "Tu n'attends pas une solution toute faite, mais un vrai levier."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-accent-light/30 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-3 bg-accent-light/20 rounded-lg border border-accent-light/30">
                  <p className="text-white/90 italic text-center">
                    Bref, tu sens qu'il y a autre chose à voir. Et tu veux explorer.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Deuxième encadré - Ce n'est pas pour toi si */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-primary-light/90 to-primary/90 backdrop-blur-sm rounded-2xl p-8 border border-primary/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full flex flex-col"
            >
              {/* Effet de lueur négative */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
              
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <span className="text-2xl mr-2">👉</span> Ce n'est pas pour toi si :
                  </h3>
                  <ThumbsDown className="w-6 h-6 text-white/60" />
                </div>
                
                <ul className="space-y-4 flex-1">
                  {[
                    "Tu veux une méthode toute faite, à appliquer sans questionner.",
                    "Tu cherches un changement sans inconfort, sans mouvement, sans surprise.",
                    "Tu veux un résultat immédiat, sans y mettre un peu de toi.",
                    "Ce n'est pas du tout le moment, tu n'as ni l'espace ni l'énergie (et c'est ok).",
                    "Tu veux qu'on t'apporte \"LA\" réponse, plutôt que d'explorer les tiennes."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/50 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-white/90" />
                      </div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-3 bg-primary/40 rounded-lg border border-primary/60">
                  <p className="text-white/90 font-medium text-center">
                    Ici, on ne plaque pas une solution. On ouvre des chemins.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <a
              href="https://calendly.com/jennifer-perrault/call-decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-light 
                text-white text-lg font-semibold rounded-full transition-all transform 
                hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Tu te demandes si c'est le bon moment ? Appelle-moi, on en parle.</span>
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};