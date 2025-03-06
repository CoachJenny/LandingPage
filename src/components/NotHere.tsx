import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock, Target, FileSpreadsheet, StickyNote, ArrowRight, Sparkles } from 'lucide-react';

export const NotHere: React.FC = () => {
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
          <h2 className="text-4xl font-display text-center mb-4 text-white">
            Ce Que Tu Ne Trouveras Pas Ici
          </h2>
          <p className="text-xl text-center text-white/80 mb-12 italic">
            Ou : &quot;Pourquoi je ne vais pas te vendre un rêve en 10 étapes&quot;
          </p>

          <div className="relative group mb-12">
            {/* Effet de lueur dramatique */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-light to-accent opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-primary/95 to-primary rounded-2xl p-8 border border-accent/50 shadow-2xl">
              <p className="text-xl text-white mb-6">
                Non, je ne vais pas te vendre 8 000 € LA méthode miracle pour :
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "T'organiser comme un robot surproductif",
                  "Cocher toutes tes cases en restant parfaitement zen",
                  "Devenir la version 'optimisée' de toi-même en un claquement de doigts",
                  "Appliquer 'LA' méthode que tout le monde s'arrache"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-white"
                  >
                    <X className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="text-xl text-white mb-6">
                ...pour ensuite te balancer :
              </p>
              <ul className="space-y-6 mb-12">
                {[
                  {
                    icon: FileSpreadsheet,
                    text: "La matrice Eisenhower",
                    subtext: "parce que tes vraies priorités ne tiennent pas sur un tableau Excel"
                  },
                  {
                    icon: Clock,
                    text: "La méthode Pomodoro",
                    subtext: "comme si mettre un timer suffisait à lever tes résistances profondes"
                  },
                  {
                    icon: StickyNote,
                    text: "Un mur de post-it",
                    subtext: "qui finira par jaunir sans que rien ne bouge vraiment"
                  },
                  {
                    icon: Target,
                    text: "Le fameux 'Quand on veut, on peut'",
                    subtext: "comme si tes blocages n'avaient rien de précieux à raconter sur toi"
                  }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 4) * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="text-white font-medium">{item.text}</span>
                      <span className="text-white/90 italic ml-2">({item.subtext})</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deuxième encadré avec effet dramatique */}
          <div className="relative group">
            {/* Effet de lueur dramatique amélioré */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-light to-accent opacity-75 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-accent to-accent-light rounded-2xl p-8 border border-white/20 shadow-2xl overflow-hidden">
              {/* Cercles décoratifs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
              
              <div className="relative z-10 text-center space-y-8">
                <p className="text-xl text-primary font-semibold">
                  Il ne s'agit pas de tout déconstruire, de tout balayer.
                  <br />
                  Il s'agit de trouver ce qui vibre déjà en toi et d'apprendre à t'y appuyer.
                </p>

                <ul className="space-y-6">
                  {[
                    "Pas une méthode en kit, mais une connexion à ce qui te fait avancer pour de vrai.",
                    "Pas une 'discipline' de plus à t'imposer, mais une manière d'habiter pleinement ton propre rythme.",
                    "Pas un énième 'plan d'action', mais une toile de jeu solide sur laquelle tu peux marcher, courir, rebondir."
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index + 8) * 0.1 }}
                      className="flex items-center justify-center text-primary font-medium"
                    >
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Section Game Changer avec effet dramatique */}
                <div className="relative mt-12 py-8">
                  {/* Fond lumineux animé */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary rounded-xl opacity-90"></div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="relative z-10"
                  >
                    <div className="flex justify-center mb-6">
                      <Sparkles className="w-8 h-8 text-accent animate-pulse" />
                    </div>
                    <p className="text-2xl text-white font-semibold mb-4">
                      Ce n'est pas une question de volonté.
                      <br />
                      C'est une question d'alignement.
                    </p>
                    <div className="relative inline-block">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="absolute bottom-0 left-0 h-1 bg-accent"
                      />
                      <p className="text-3xl font-display text-accent mb-0">
                        Et ça, c'est un game changer.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="text-center mt-12"
                >
                  <a
                    href="#quiz"
                    className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-light 
                      text-white text-lg font-semibold rounded-full transition-all transform 
                      hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Oublie les plans tout faits. Trouvons ce qui te porte vraiment.</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <p className="text-primary mt-4 font-medium">→ Fais le test</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};