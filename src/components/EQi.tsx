import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Sparkles, ArrowRight } from 'lucide-react';

export const EQi: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#6B3FA0] via-[#4B2C75] to-[#2A1947] relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-light/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Brain className="w-8 h-8 text-accent" />
            <Heart className="w-8 h-8 text-accent-light" />
          </div>

          <h2 className="text-4xl font-display text-center mb-6 text-white">
            L'intelligence émotionnelle : un miroir, pas un verdict
          </h2>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              On avance tous avec des schémas émotionnels bien ancrés. Des réactions qu'on répète, des intuitions qu'on suit (ou pas), des doutes qui s'invitent pile au mauvais moment.
            </p>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Sauf qu'on ne nous a jamais appris comment ça fonctionne, ni comment s'en servir vraiment.
            </p>
            <p className="text-2xl font-display text-accent-light text-center mb-8">
              C'est là que l'EQ-i entre en jeu.
            </p>
            <p className="text-xl text-white/90 text-center italic">
              Cet outil n'est pas là pour te donner une note ou un classement. Il est là pour mettre des mots sur ce que tu ressens déjà, mais que tu n'as peut-être jamais regardé sous cet angle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Ce qu'il permet :</h3>
              <ul className="space-y-4">
                {[
                  "Comprendre comment tu interagis avec toi-même et avec les autres – et pourquoi certaines situations t'épuisent, te challengent ou t'illuminent.",
                  "Mettre en lumière tes forces et les points de tension – et comment les utiliser intelligemment plutôt que de les subir.",
                  "Aligner tes émotions, tes décisions et ton impact – parce que non, la réussite et la clarté ne sont pas qu'une question de volonté."
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-white/90">
                    <span className="text-accent mr-3">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Dans mes accompagnements, l'EQ-i ne vient pas juste "mesurer" :</h3>
              <ul className="space-y-4">
                {[
                  "Il donne une texture concrète aux histoires qu'on explore en coaching.",
                  "Il révèle les récits invisibles qui influencent tes choix, tes relations, ton audace.",
                  "Il t'aide à voir ce que tu portes déjà en toi, et comment l'utiliser pour avancer avec plus de justesse."
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-white/90">
                    <Sparkles className="w-5 h-5 text-accent-light mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                program: "Lightwave",
                description: "Il te permet d'identifier ce qui crée les boucles dans lesquelles tu tournes et comment élargir le champ des possibles."
              },
              {
                program: "Lightning",
                description: "Il devient un levier pour ajuster ton leadership, renforcer ton impact et gagner en fluidité relationnelle."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.2) }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-accent-light rounded-full mr-3"></div>
                  <h4 className="text-lg font-semibold text-white">Dans {item.program}</h4>
                </div>
                <p className="text-white/90">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
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
              <span className="mr-2">💭</span>
              <span>Envie de voir ce que ton intelligence émotionnelle peut révéler sur toi ?</span>
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-white/80 mt-4">→ Réserve ton créneau gratuit</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};