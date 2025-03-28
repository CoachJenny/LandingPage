import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
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
          <div className="card p-6 md:p-8">
            <h2 className="heading-md text-white mb-6">
              Marre d'avoir l'impression constante...
            </h2>
            
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};