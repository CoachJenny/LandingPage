import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Star, Rocket, Shield, X, ArrowRight } from 'lucide-react';

export const Expectations: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-light via-primary to-primary relative overflow-hidden">
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
          <h2 className="text-4xl font-display text-center mb-16 text-white">
            Ce à quoi tu peux t'attendre
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: Sparkles,
                emoji: "🌀",
                title: "Des conversations narratives",
                description: "Pas juste des discussions, mais une véritable exploration. Toi et moi, on part en quête d'histoires jamais racontées, de souvenirs oubliés, de liens invisibles qui, une fois révélés, changent tout."
              },
              {
                icon: Palette,
                emoji: "🎭",
                title: "Des exercices variés et originaux",
                description: "Pas de cases à cocher, pas de \"répète après moi\" sans âme. Mais des expériences qui ouvrent des portes, qui t'invitent à voir autrement, à ressentir différemment. Parce que la bonne question, parfois, n'est pas celle qu'on attend."
              },
              {
                icon: Star,
                emoji: "✨",
                title: "Une émergence forte de ce qui te définit",
                description: "Tes valeurs, tes intentions, ta singularité. Ce qui te fait vibrer. Ce qui est déjà là, mais que tu ne regardes pas encore sous le bon angle. Et une fois que ça devient clair, l'action suit avec une évidence redoutable."
              },
              {
                icon: Rocket,
                emoji: "🚀",
                title: "Un mouvement qui ne s'arrête pas aux séances",
                description: "Ce que nous allons créer ici ne s'éteindra pas après trois mois. Tu ne repars pas avec un carnet de \"bonnes pratiques\". Tu repars avec un regard neuf sur toi-même, et ça, ça continue d'agir bien après."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-accent to-accent-light rounded-2xl p-8 border border-white/10 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">{item.emoji}</span>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Section dramatique pour les problèmes */}
          <div className="relative mb-12 group">
            {/* Effet de lueur dramatique */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary-light opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-primary/95 to-primary rounded-2xl p-8 border border-accent/50 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center mb-8">
                  <Shield className="w-8 h-8 text-accent mr-4" />
                  <h3 className="text-2xl font-display text-white">
                    Ce à quoi TES PROBLÈMES peuvent s'attendre
                  </h3>
                </div>
                
                <p className="text-white/80 italic mb-8">
                  (Ne leur dis pas, ça risquerait de les faire paniquer… et t'empêcher de venir.)
                </p>

                <p className="text-xl text-white mb-8">
                  Alors là, les pauvres, ça ne va pas être confortable pour eux.
                </p>

                <ul className="space-y-4 mb-12">
                  {[
                    "On va les mettre à distance, histoire qu'ils arrêtent de se prendre pour toi.",
                    "On va les mettre à nu, parce que leur pouvoir, c'est surtout celui qu'ils exercent dans l'ombre.",
                    "Et puis, on va dégommer leur influence, un par un, méthodiquement, sans leur laisser une chance de se planquer sous le tapis."
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + (index * 0.1) }}
                      className="flex items-center text-white/90"
                    >
                      <span className="text-accent mr-3">👉</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <p className="text-white mb-6">Et là, pas de traitement de faveur :</p>
                
                <ul className="space-y-4 mb-12">
                  {[
                    "La timidité qui t'empêche de prendre ta place ? Au grand jour.",
                    "La confusion qui te fait tourner en rond ? On lui met une boussole sous le nez.",
                    "Le perfectionnisme qui te grignote l'énergie ? On lui apprend la nuance.",
                    "Le stress qui te fait perdre tes moyens ? On le démonte pièce par pièce.",
                    "L'imposture, l'auto-sabotage, la peur de déranger, l'impression de ne jamais en faire assez ? Tous logés à la même enseigne."
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + (index * 0.1) }}
                      className="flex items-center text-white/90"
                    >
                      <X className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="text-center"
                >
                  <p className="text-xl text-white mb-4">
                    Bref, si tes problèmes pensaient couler des jours tranquilles, ils vont être déçus.
                  </p>
                  <p className="text-2xl font-display text-accent">
                    Et toi ? Tu vas enfin respirer.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-center"
          >
            <a
              href="#quiz"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-light 
                text-white text-lg font-semibold rounded-full transition-all transform 
                hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>🔥 On va voir si tes blocages sont aussi costauds qu'ils le prétendent.</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <p className="text-white/80 mt-4">→ Fais le test</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};