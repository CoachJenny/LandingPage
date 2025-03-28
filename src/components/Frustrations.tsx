import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, AlertCircle } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

export const Frustrations: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-light/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            {/* Section des impressions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent to-accent-light rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
            >
              {/* Effet de lueur dramatique */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <AlertCircle className="w-8 h-8 text-white mr-3" />
                  <h2 className="text-3xl font-display text-white">
                    Marre d'avoir l'impression constante...
                  </h2>
                </div>
                
                <ul className="space-y-6">
                  {[
                    "d'être débordé·e sans être reconnu·e ?",
                    "que rien n'avance, malgré toute l'énergie que tu mets ?",
                    "de ne pas savoir poser tes limites — ou trop tard, trop fort ?",
                    "de toujours te censurer, même quand tu sais que ce que tu as à dire est valable ?"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      className="flex items-start bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10 
                        transform transition-all duration-300 hover:scale-[1.02] hover:bg-black/30"
                    >
                      <span className="text-white text-2xl mr-4 font-bold">→</span>
                      <span className="text-white text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Section des situations concrètes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-accent/20 shadow-2xl"
            >
              <ul className="space-y-6">
                {[
                  "Cette augmentation que tu n'arrives pas à demander.",
                  "Ce collaborateur qu'un coup tu recadres trop peu, un coup trop fort.",
                  "Ce feedback que tu rumines pendant des jours.",
                  "Cette position que tu n'arrives pas à faire entendre au Comex, alors qu'elle est solide."
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                    className="text-xl text-white italic relative pl-6 before:content-[''] before:absolute before:left-0 
                      before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-accent 
                      before:rounded-full before:shadow-[0_0_10px_rgba(255,107,107,0.5)]"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Section conclusion et CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="relative group"
            >
              {/* Effet de lueur dramatique */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-light to-accent opacity-75 
                blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <div className="relative bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 
                text-center shadow-2xl">
                <p className="text-2xl font-display text-white mb-8">
                  Ces problèmes, mes clients me les rapportent fréquemment.<br />
                  <span className="text-accent-light font-bold">Et surtout : ce n'est pas une fatalité.</span>
                </p>

                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-6 bg-black/30 px-6 py-3 rounded-full">
                    <Flame className="w-8 h-8 text-accent animate-pulse mr-3" />
                    <span className="text-2xl text-white">Tu veux voir où tu en es, vraiment ?</span>
                  </div>

                  <HashLink
                    to="/#quiz"
                    className="inline-flex items-center px-10 py-5 bg-accent hover:bg-accent-light 
                      text-white text-xl font-bold rounded-full transition-all transform 
                      hover:scale-105 shadow-[0_0_20px_rgba(255,107,107,0.3)] hover:shadow-[0_0_30px_rgba(255,107,107,0.5)]
                      group relative overflow-hidden"
                  >
                    <span className="relative z-10">Fais le quiz</span>
                    <ArrowRight className="ml-2 h-6 w-6 transform group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500"></div>
                  </HashLink>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};