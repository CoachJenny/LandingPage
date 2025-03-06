import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Promise: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent via-accent to-accent-light relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-display text-center mb-8 text-white">
            La promesse que je ne te ferai pas
          </h2>

          <div className="bg-gradient-to-br from-primary via-primary to-primary-light rounded-2xl p-8 mb-12 border border-white/10">
            <p className="text-xl text-white mb-6 text-center italic">
              &quot;En trois mois, je t'aide à surmonter tous tes blocages et créer la vie de tes rêves, sans jamais que ce soit inconfortable.&quot;
            </p>
            <p className="text-sm text-white/60 text-center mb-12">
              (Et dans les petites lignes : &quot;Bien sûr, il faut aussi être motivé·e et impliqué·e pour que ça marche&quot;, avec un subtil sous-entendu culpabilisant.)
            </p>

            <h3 className="text-2xl text-white mb-8 text-center">
              Pourquoi je ne te dis pas ça ?
            </h3>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-xl text-white flex items-center">
                  <ArrowRight className="w-6 h-6 text-accent mr-3" />
                  Déjà – pourquoi &quot;en trois mois&quot; ?
                </h4>
                <p className="text-white/90 pl-9">
                  Oui, peut-être. Mais peut-être en six. Parce que changer réellement, en profondeur, ça prend parfois du temps. Et parfois, non : ça peut prendre 10 jours, ou même une seule séance, quand un déclic se produit au bon moment.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h4 className="text-xl text-white flex items-center">
                  <ArrowRight className="w-6 h-6 text-accent mr-3" />
                  Surmonter TOUS tes blocages ? Créer LA vie de tes RÊVES ?
                </h4>
                <p className="text-white/90 pl-9">
                  Bien sûr, c'est l'intention. Et le coaching te donnera des outils qui continueront d'agir bien après nos séances.
                  <br />
                  Mais rappelons-nous que ton moteur, c'est toi.
                  <br />
                  Je serais quand même ultra mégalo de me réduire à un slogan où je joue le rôle principal dans ta propre transformation, non ?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h4 className="text-xl text-white flex items-center">
                  <ArrowRight className="w-6 h-6 text-accent mr-3" />
                  &quot;Sans inconfort&quot; ?
                </h4>
                <p className="text-white/90 pl-9">
                  Peut-être. Peut-être pas.
                  <br />
                  La nouveauté, ça peut être déroutant. Et nos conversations ?
                  <br />
                  Elles ne ressembleront à rien de ce que tu as connu.
                  <br />
                  Je vais te poser des questions que personne ne t'a jamais posées.
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-2xl font-display text-accent text-center mt-12"
            >
              Et ça, c'est là que tout commence.
            </motion.p>
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
              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-light 
                text-white text-lg font-semibold rounded-full transition-all transform 
                hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Le vrai changement ne tient pas en une punchline. On en parle ?</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <p className="text-white/80 mt-4">→ Réserve ton créneau gratuit</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};