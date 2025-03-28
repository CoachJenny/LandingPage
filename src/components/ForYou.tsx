import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Phone } from 'lucide-react';

export const ForYou: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-light to-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-light/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* C'est pour toi si */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 md:p-8"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-6">
                👉 C'est pour toi si :
              </h3>
              
              <ul className="space-y-4">
                {[
                  "Tu tournes en rond avec la sensation qu'un truc t'échappe.",
                  "Tu veux avancer avec clarté, sans t'enfermer dans une case.",
                  "Tu as tout essayé (articles, méthodes, formations)… et pourtant.",
                  "Tu veux comprendre ce qui te freine, mais autrement.",
                  "Tu es prêt.e à libérer les voiles, à rencontrer ta créativité."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-accent-light mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ce n'est pas pour toi si */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 md:p-8"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-6">
                👉 Ce n'est pas pour toi si :
              </h3>
              
              <ul className="space-y-4">
                {[
                  "Tu veux une méthode toute faite, à appliquer sans questionner.",
                  "Tu cherches un changement sans inconfort, sans mouvement.",
                  "Tu veux un résultat immédiat, sans y mettre un peu de toi.",
                  "Ce n'est pas du tout le moment (et c'est ok).",
                  "Tu veux qu'on t'apporte LA réponse, plutôt que d'explorer."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="w-5 h-5 text-white/60 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <a
              href="https://calendly.com/jennifer-perrault/call-decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Tu te demandes si c'est le bon moment ? Appelle-moi, on en parle.</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};