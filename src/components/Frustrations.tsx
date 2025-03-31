import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, AlertCircle } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

export const Frustrations: React.FC = () => {
  return (
    <section id="frustrations" className="section-padding bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-light/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Section des impressions */}
          <div className="card p-6 md:p-8">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-8 h-8 text-white mr-3" />
              <h2 className="heading-md text-white">
                Marre d'avoir l'impression constante...
              </h2>
            </div>
            
            <ul className="space-y-4">
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
                  <span className="text-white text-xl mr-4 font-bold">→</span>
                  <span className="text-white text-base md:text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Section des situations concrètes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6 md:p-8"
          >
            <ul className="space-y-4">
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
                  className="text-lg md:text-xl text-white italic relative pl-6 before:content-[''] before:absolute before:left-0 
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
            className="card p-6 md:p-8 text-center"
          >
            <p className="text-xl md:text-2xl font-display text-white mb-8">
              Ces problèmes, mes clients me les rapportent fréquemment.<br />
              <span className="text-accent-light font-bold">Et surtout : ce n'est pas une fatalité.</span>
            </p>

            <div className="flex flex-col items-center">
              <div className="flex items-center mb-6 bg-black/30 px-6 py-3 rounded-full">
                <Flame className="w-8 h-8 text-accent animate-pulse mr-3" />
                <span className="text-xl md:text-2xl text-white">Tu veux voir où tu en es, vraiment ?</span>
              </div>

              <ScrollLink
                to="quiz"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="btn btn-primary inline-flex"
              >
                <span>Fais le test</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </ScrollLink>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};