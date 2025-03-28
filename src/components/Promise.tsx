import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Promise: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-accent via-accent to-accent-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="heading-lg text-center mb-8 text-white">
            La promesse que je ne te ferai pas
          </h2>

          <div className="card p-6 md:p-8 mb-8">
            <p className="text-xl text-white mb-6 text-center italic">
              &quot;En trois mois, je t'aide à surmonter tous tes blocages et créer la vie de tes rêves, sans jamais que ce soit inconfortable.&quot;
            </p>
            <p className="text-sm text-white/60 text-center">
              (Et dans les petites lignes : &quot;Bien sûr, il faut aussi être motivé·e et impliqué·e pour que ça marche&quot;)
            </p>
          </div>

          <div className="card p-6 md:p-8 space-y-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl text-white flex items-center mb-3">
                  <ArrowRight className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  Déjà – pourquoi &quot;en trois mois&quot; ?
                </h4>
                <p className="text-white/90 pl-8">
                  Oui, peut-être. Mais peut-être en six. Parce que changer réellement, en profondeur, ça prend parfois du temps.
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl text-white flex items-center mb-3">
                  <ArrowRight className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  Surmonter TOUS tes blocages ?
                </h4>
                <p className="text-white/90 pl-8">
                  Bien sûr, c'est l'intention. Mais rappelons-nous que ton moteur, c'est toi. Je serais quand même ultra mégalo de me réduire à un slogan où je joue le rôle principal dans ta propre transformation, non ?
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl text-white flex items-center mb-3">
                  <ArrowRight className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  &quot;Sans inconfort&quot; ?
                </h4>
                <p className="text-white/90 pl-8">
                  Peut-être. Peut-être pas. La nouveauté, ça peut être déroutant. Je vais te poser des questions que personne ne t'a jamais posées.
                </p>
              </div>
            </div>

            <p className="text-2xl font-display text-accent text-center">
              Et ça, c'est là que tout commence.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <a
              href="https://calendly.com/jennifer-perrault/call-decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>Le vrai changement ne tient pas en une punchline. On en parle ?</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};