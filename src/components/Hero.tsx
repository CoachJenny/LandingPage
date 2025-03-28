import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-primary-light text-white flex items-center relative pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-display mb-6 leading-tight">
            Et si tes blocages tenaient tes rêves à l'ombre ?
            <span className="block text-accent-light">Ensemble, faisons la lumière.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Tu t'investis sans relâche, tu analyses, tu cherches des solutions… 
            mais la frustration persiste, te freinant dans ton élan.
          </p>

          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ScrollLink
              to="frustrations"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-light text-white text-lg font-semibold rounded-full transition-all cursor-pointer"
            >
              Tu veux voir si je parle de toi ?
              <ArrowDown className="ml-2 h-5 w-5" />
            </ScrollLink>
            <p className="text-white/80 mt-4">→ Lis ça, tu vas te reconnaître</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-accent-light" />
      </div>
    </section>
  );
};