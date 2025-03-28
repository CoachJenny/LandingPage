import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-[100svh] bg-gradient-to-b from-primary to-primary-light text-white flex items-center relative pt-safe-top">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Hidden H1 for SEO */}
          <h1 className="sr-only">
            Coaching professionnel, coaching de carrière et leadership – Nahara Coaching
          </h1>
          
          {/* Visible creative heading */}
          <h2 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-display mb-4 md:mb-6 leading-tight">
            Et si tes blocages tenaient tes rêves à l'ombre ?
            <span className="block text-accent-light mt-2">Ensemble, faisons la lumière.</span>
          </h2>
          
          <p className="text-lg xs:text-xl md:text-2xl mb-8 md:mb-12 text-gray-200 px-2">
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
              duration={500} // Reduced from 800 to 500 for faster scrolling
              className="touch-target inline-flex items-center px-6 md:px-8 py-4 bg-accent hover:bg-accent-light text-white text-base md:text-lg font-semibold rounded-full transition-all cursor-pointer"
            >
              Tu veux voir si je parle de toi ?
              <ArrowDown className="ml-2 h-5 w-5" />
            </ScrollLink>
            <p className="text-white/80 mt-4 text-sm md:text-base">→ Lis ça, tu vas te reconnaître</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <ArrowDown className="h-8 w-8 text-accent-light" />
      </div>
    </section>
  );
};