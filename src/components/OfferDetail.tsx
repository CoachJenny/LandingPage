import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { coachingOffers } from '../data/content';
import { ArrowLeft, Check, Clock, Users, ArrowRight } from 'lucide-react';

type OfferParams = {
  id: string;
};

export const OfferDetail: React.FC = () => {
  const { id } = useParams<OfferParams>();
  const location = useLocation();
  const offer = coachingOffers.find(o => o.id === id);

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="text-center">
          <h2 className="text-3xl font-display mb-6">Programme non trouvé</h2>
          <HashLink 
            to="/#offers" 
            className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-full
              hover:bg-white/90 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux offres
          </HashLink>
        </div>
      </div>
    );
  }

  // Function to render text with WhatsApp links
  const renderWithWhatsAppLinks = (text: string): React.ReactNode => {
    if (!text.includes('WhatsApp')) return text;
    
    const parts = text.split(/(Suivi WhatsApp)/g);
    return parts.map((part, index) => {
      if (part === 'Suivi WhatsApp') {
        return (
          <HashLink 
            key={index} 
            to="/#whatsapp-faq" 
            className="text-accent-light hover:underline"
          >
            {part}
          </HashLink>
        );
      }
      return part;
    });
  };

  // Custom content based on offer ID
  const customContent = {
    description: "",
    process: [] as string[],
    forWhom: [] as string[],
    impactBlocks: [] as { title: string, items: string[], conclusion?: string }[]
  };

  if (id === "etincelle") {
    customContent.description = "Une séance intensive pour identifier tes blocages et amorcer le changement. Idéal pour découvrir le coaching narratif et ouvrir de nouvelles perspectives.";
    customContent.process = [
      "Séance de 60 minutes en visioconférence",
      "Document de synthèse pour ancrer tes prises de conscience",
      "Option : Suivi WhatsApp pendant 1 semaine",
      "Option : Call de suivi une semaine après"
    ];
    customContent.forWhom = [
      "Tu souhaites expérimenter le coaching narratif",
      "Tu as un blocage spécifique à explorer",
      "Tu cherches une première mise en mouvement"
    ];
    customContent.impactBlocks = [{
      title: "Ce qui peut changer en 60 minutes :",
      items: [
        "Tu cernes ce qui te bloque sur une décision précise — et tu tranches.",
        "Tu revois un entretien, un message ou une prise de parole que tu dois faire — avec clarté.",
        "Tu formules une demande, une limite ou une idée qui restait coincée.",
        "Tu comprends pourquoi tu te sabotes sur un sujet — et ce que tu peux faire dès maintenant.",
        "Tu ressors avec une action à poser dans les 48h, et tu la poses."
      ],
      conclusion: "Ce n'est pas une prise de conscience abstraite.\nC'est un coup de projecteur pour passer à l'action — tout de suite."
    }];
  } else if (id === "lightwave") {
    customContent.description = "Un programme en 5 séances pour dépasser ce qui te freine et créer un changement durable. Une approche progressive, qui te permet d'explorer, d'ancrer et d'avancer avec clarté.";
    customContent.process = [
      "5 séances de 90 min en visioconférence",
      "Documentation narrative pour ancrer tes prises de conscience",
      "Exercices narratifs sélectionnés spécialement pour toi",
      "Option : Inventaire EQ-i et débriefing: 169€",
      "Option : Suivi WhatsApp entre les séances 110€"
    ];
    customContent.forWhom = [
      "Tu veux avancer en profondeur, sans solution toute faite",
      "Tu es prêt·e à investir du temps et de l'énergie dans ce travail",
      "Tu cherches un accompagnement structuré et progressif"
    ];
    customContent.impactBlocks = [{
      title: "Ce que ça change concrètement dans ton job :",
      items: [
        "Tu sais dire non à une demande sans avoir peur de \"te griller\".",
        "Tu arrêtes de compenser les erreurs des autres — tu responsabilises.",
        "Tu reprends le lead dans ta fiche de poste, au lieu de subir les priorités des autres.",
        "Tu expliques clairement ce que tu veux — et les gens l'entendent.",
        "Tu lances un projet que tu remettais à plus tard depuis des mois.",
        "Tu t'affirmes sans surjouer — et on commence à venir te chercher, pas juste à te déléguer."
      ],
      conclusion: "Lightwave, c'est pour faire de la place à ce que tu veux vraiment construire.\nEt retrouver une posture qui t'appartient."
    }];
  } else if (id === "lightning") {
    customContent.description = "Un accompagnement en 10 séances pour transformer en profondeur ton leadership et ton rapport à toi-même. Un espace exigeant et soutenant, conçu pour aller au bout de ta réflexion, affiner ta posture et créer un impact durable.";
    customContent.process = [
      "10 séances individuelles de coaching",
      "Documentation narrative pour ancrer tes prises de conscience",
      "Suivi WhatsApp tout au long du programme*",
      "Inventaire EQ-i Leadership",
      "2 séances de débriefing supplémentaires spécifiques"
    ];
    customContent.forWhom = [
      "Tu veux aller au bout de ta transformation",
      "Tu cherches un accompagnement structurant et exigeant",
      "Tu veux développer un leadership aligné, impactant et fluide"
    ];
    customContent.impactBlocks = [{
      title: "Ce que ça change dans ton job...concrètement :",
      items: [
        "Tu recadres sans te crisper. Ton équipe sait où tu vas. Et elle suit.",
        "Tu prends des décisions difficiles sans tourner en boucle trois semaines.",
        "Tu fais passer ton point de vue au Comex, sans t'adapter à chaque regard.",
        "Tu tiens une posture claire — même en terrain hostile, même sous pression.",
        "Tu ne laisses plus tes doutes piloter ton impact : tu choisis ce que tu veux porter.",
        "Tu redeviens moteur dans les discussions stratégiques. Tu n'exécutes plus, tu penses.",
        "Tu n'as plus besoin d'en faire trois fois trop pour être respecté·e."
      ],
      conclusion: "Lightning, c'est pour celles et ceux qui ont une place à tenir —\net qui veulent la tenir sans se déformer."
    }];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-4">
          <HashLink 
            to="/#offers" 
            className="inline-flex items-center text-white/80 hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux offres
          </HashLink>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display mb-6 text-white">
              {offer.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {customContent.description}
            </p>

            {/* Impact block */}
            {customContent.impactBlocks.map((block, blockIndex) => (
              <motion.div
                key={blockIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm 
                  rounded-2xl p-8 border border-white/10 max-w-3xl"
              >
                <h2 className="text-2xl font-display text-white mb-6">
                  {block.title}
                </h2>
                <ul className="space-y-4">
                  {block.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="flex items-start text-white/90"
                    >
                      <Check className="w-5 h-5 text-accent-light mr-3 flex-shrink-0 mt-1" />
                      <span className="text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                {block.conclusion && (
                  <div className="mt-8 text-center">
                    {block.conclusion.split('\n').map((line, i) => (
                      <p key={i} className="text-xl font-display text-accent-light">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column - Main content */}
          <div className="md:col-span-2 space-y-12">
            {/* Process section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg"
            >
              <h2 className="text-2xl font-display mb-6 flex items-center text-white">
                <Clock className="w-6 h-6 mr-3 text-accent-light" />
                Déroulement du programme
              </h2>
              <div className="space-y-4">
                {customContent.process.map((step: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-white font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-white/90 pt-1">
                      {renderWithWhatsAppLinks(step)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* For whom section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg"
            >
              <h2 className="text-2xl font-display mb-6 flex items-center text-white">
                <Users className="w-6 h-6 mr-3 text-accent-light" />
                Pour qui ?
              </h2>
              <div className="space-y-4">
                {customContent.forWhom.map((item: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-accent-light mr-4 flex-shrink-0 mt-1" />
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right column - Sticky pricing card */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="sticky top-8"
            >
              <div className="bg-gradient-to-br from-accent/20 to-accent-light/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-white">Options disponibles</h3>
                <div className="space-y-4">
                  {offer.id === "etincelle" ? (
                    <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-base md:text-lg text-white">Essentiel</h4>
                        <span className="text-xl md:text-2xl font-bold text-accent-light whitespace-nowrap">150€*</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start text-xs md:text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>Séance de 60 min</span>
                        </li>
                        <li className="flex items-start text-xs md:text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>Trace narrative</span>
                        </li>
                      </ul>
                      <div className="text-xs text-white/60 mt-2 italic">
                        *Maximum 1 par personne / par semestre
                      </div>
                    </div>
                  ) : offer.id === "lightwave" ? (
                    <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-base md:text-lg text-white">Programme complet</h4>
                        <span className="text-xl md:text-2xl font-bold text-accent-light whitespace-nowrap">1500€</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start text-xs md:text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>5 séances</span>
                        </li>
                        <li className="flex items-start text-xs md:text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>Documentation narrative</span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      {offer.options.map((option, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-white/10 border border-white/20"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-base md:text-lg text-white">{option.title}</h4>
                            <span className="text-xl md:text-2xl font-bold text-accent-light whitespace-nowrap">{option.price}</span>
                          </div>
                          <ul className="space-y-2">
                            {option.includes.map((item: string, i: number) => (
                              <li key={i} className="flex items-start text-xs md:text-sm text-white/80">
                                <Check className="w-4 h-4 text-accent-light mr-2 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <a
                    href="https://calendly.com/jennifer-perrault/call-decouverte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-white text-sm md:text-base font-semibold
                      bg-gradient-to-r from-accent to-accent-light
                      hover:from-accent-light hover:to-accent
                      transition-all duration-300 shadow-md hover:shadow-lg
                      flex items-center justify-center space-x-2"
                  >
                    <span>Réserver mon échange gratuit</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </a>

                  <p className="text-xs md:text-sm text-white/70 text-center mt-4">
                    Premier échange offert et sans engagement
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};