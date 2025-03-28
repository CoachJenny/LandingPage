import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Storytelling: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-light to-primary relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-light/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
          </div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <p className="text-white/90 leading-relaxed text-lg">
                Moi aussi, j'ai cru qu'il fallait rester dans les cases.<br />
                Cacher ce qui déborde. Composer. Être sérieuse, brillante, irréprochable.<br />
                Et pourtant… quelque chose résistait.<br />
                Un feu doux. Une voix têtue. Un souffle de vent qui murmurait :<br />
                <span className="text-accent-light italic">« Et si tu pouvais créer tes propres règles ? »</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <p className="text-white/90 leading-relaxed text-lg">
                J'ai mis du temps à l'écouter.<br />
                Mais quand j'ai commencé à tendre l'oreille, j'ai retrouvé des récits oubliés.<br />
                Des moments de clarté. De courage. De joie.<br />
                Je les ai rassemblés, un à un.<br />
                Et avec eux, j'ai tracé un nouveau chemin. Le mien.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <p className="text-white/90 leading-relaxed text-lg">
                Aujourd'hui, c'est ce que je fais avec celles et ceux que j'accompagne.<br />
                On éclaire ensemble les histoires qui limitent.<br />
                On retrouve celles qui portent.<br />
                Et on rallume la lumière là où elle semblait éteinte.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <p className="text-white/90 leading-relaxed text-lg text-center">
                Tu es peut-être au bon endroit si toi aussi,<br />
                tu sens qu'il y a plus en toi.<br />
                Quelque chose de précieux. De vivant.<br />
                Quelque chose qui attend d'être raconté,<br />
                pour enfin t'appartenir.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};