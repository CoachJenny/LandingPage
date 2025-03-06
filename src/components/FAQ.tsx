import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ContactForm } from './ContactForm';

const faqs = [
  {
    question: "Comment savoir si cet accompagnement est fait pour moi ?",
    answer: "Si tu ressens une frustration, une envie de mouvement, mais que quelque chose te freine sans que tu saches exactement quoi, alors cet accompagnement peut t'apporter des clés essentielles.\n\nMon approche est faite pour toi si tu veux mieux comprendre tes schémas, clarifier tes décisions et avancer avec plus d'alignement."
  },
  {
    question: "Combien de temps dure un accompagnement ?",
    answer: "Cela dépend de l'offre choisie :\n\nÉtincelle : Une séance unique pour un premier éclairage.\n\nLightwave : Un cycle de 5 séances sur 2 à 3 mois.\n\nLightning : Un accompagnement profond sur 10 séances, réparties sur 4 à 6 mois."
  },
  {
    question: "Quels résultats puis-je attendre ?",
    answer: "Chaque personne vit une transformation unique, mais les bénéfices incluent :\n\n• Une meilleure compréhension de tes blocages et de tes leviers d'action\n• Un gain de clarté sur tes décisions et ton positionnement\n• Un leadership plus affirmé et plus fluide\n• Une relation plus apaisée avec tes émotions et celles des autres"
  },
  {
    question: "Comment se déroulent les séances ?",
    answer: "Les séances sont en visio et durent entre 60 et 90 minutes.\n\nElles sont basées sur des échanges profonds, des explorations narratives et des outils d'intelligence émotionnelle adaptés à ta situation.\n\nEntre les séances, tu as le temps d'intégrer et d'expérimenter ce que nous avons travaillé."
  },
  {
    question: "💬 Suivi WhatsApp : comment ça fonctionne ?",
    answer: "🔹 Un espace d'échange continu pour partager tes avancées, prises de conscience et questions entre les séances.\n\n🔹 Je suis souvent très réactive, mais parfois, je ne peux pas répondre immédiatement. Quoi qu'il arrive, je te réponds sous 24h (hors week-ends et jours fériés).\n\n🔹 Messages écrits uniquement (pas de notes vocales ni d'appels spontanés).\n\n🔹 Le suivi ne remplace pas une séance, mais permet d'approfondir entre deux sessions.\n\n📌 Ce suivi est là pour t'accompagner, sans ajouter de pression. On ajuste ensemble le rythme et la manière d'échanger pour que ce soit fluide et utile pour toi."
  },
  {
    question: "Que se passe-t-il entre les séances ?",
    answer: "Pour les accompagnements Lightwave et Lightning, tu as accès à un suivi entre les séances (WhatsApp ou email) pour :\n\n• Poser des questions\n• Partager des prises de conscience\n• Ajuster certains points en cours de route"
  },
  {
    question: "Puis-je payer en plusieurs fois ?",
    answer: "Oui, un paiement en plusieurs fois est possible pour les accompagnements Lightwave et Lightning. N'hésite pas à me contacter pour en discuter."
  },
  {
    question: "Quelle est la différence entre coaching et thérapie ?",
    answer: "Le coaching et la thérapie ont des intentions différentes.\n\nLa thérapie s'inscrit dans un travail profond sur un temps long, visant à recréer du lien avec soi et avec les autres.\n\nLe coaching, lui, accompagne à recadrer ce qui existe déjà : il t'aide à mieux comprendre tes schémas, à clarifier tes choix et à avancer en capitalisant sur tes ressources actuelles.\n\nSi tu veux te repositionner et agir concrètement, alors le coaching est une approche adaptée."
  },
  {
    question: "À quoi je m'engage en tant que client ?",
    answer: "Un coaching est un espace d'exploration et de transformation, mais il repose sur ton implication.\n\nCe n'est pas une solution miracle, c'est un travail de co-construction où tu es pleinement acteur/actrice de ton évolution.\n\nCela implique de venir aux séances avec ouverture, d'expérimenter les pistes proposées et d'oser regarder les récits qui te freinent."
  },
  {
    question: "Quelles sont tes qualifications et expériences ?",
    answer: "Je suis certifiée coach professionnelle par HEC et praticienne narrative. Je suis également certifiée par MHS à administrer et coacher les inventaires EQ-i 2.0.\n\nAvant de me consacrer pleinement au coaching, j'ai passé 15 ans en direction financière et en conseil auprès de grands groupes, où j'ai accompagné des dirigeants sur des décisions stratégiques complexes.\n\nDepuis deux ans, j'interviens auprès d'acteurs de tailles diverses, explorant des problématiques de transformation, de leadership et de prise de décision.\n\nCette double expérience, entre rigueur financière et accompagnement humain, me permet d'apporter un regard à la fois structurant et profondément ancré dans la réalité des enjeux professionnels.\n\nJe suis affiliée à la Fédération Française des Praticiens Narratifs et à l'AICC (Association Internationale de Coaching et de Conseil), dont je m'engage à respecter le cadre déontologique."
  },
  {
    question: "Qu'est-ce que la supervision et la déontologie ?",
    answer: "La supervision est un espace où les coachs prennent du recul sur leur pratique en échangeant avec un professionnel expérimenté. Cela permet d'assurer un accompagnement éthique, efficace et aligné avec les besoins des clients.\n\nLe cadre déontologique garantit le respect de principes fondamentaux comme la confidentialité, la bienveillance et le respect de l'autonomie du client.\n\nEn tant que membre de l'AICC et de la Fédération Française des Praticiens Narratifs, je m'engage à respecter ces principes pour offrir un cadre sécurisé et professionnel."
  },
  {
    question: "Comment est encadré le coaching ?",
    answer: "Mon accompagnement respecte un cadre éthique et déontologique rigoureux.\n\nJe suis supervisée régulièrement, ce qui garantit une prise de recul et une amélioration continue de ma pratique.\n\nL'affiliation à l'AICC assure un engagement clair envers des standards professionnels élevés, notamment en matière de confidentialité et de respect du client."
  },
  {
    question: "Et si j'ai encore des questions ?",
    answer: "Tu peux me contacter directement ou réserver un échange gratuit pour voir si cet accompagnement est fait pour toi.\n\nAucun engagement, juste une conversation pour t'aider à y voir plus clair !"
  }
];

export const FAQ: React.FC = () => {
  const contactFormRef = useRef<HTMLDivElement>(null);

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-accent-light via-accent to-accent relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <HelpCircle className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h2 className="text-4xl font-display text-white mb-6">Questions fréquentes</h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
                id={faq.question.includes("WhatsApp") ? "whatsapp-faq" : ""}
              >
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-lg 
                        font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl 
                        text-white border border-white/10 transition-all duration-300
                        focus:outline-none focus-visible:ring focus-visible:ring-white/30"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-white/70 transition-transform duration-300`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-6 py-4 mt-2 bg-white/5 backdrop-blur-sm 
                        rounded-xl text-white/90 border border-white/10 whitespace-pre-line">
                        {faq.answer}
                        {faq.question === "Et si j'ai encore des questions ?" && (
                          <div className="mt-4">
                            <button
                              onClick={scrollToContactForm}
                              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors"
                            >
                              Me contacter directement
                            </button>
                          </div>
                        )}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </div>
          
          <div ref={contactFormRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ContactForm source="FAQ" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};