import { CoachingOffer } from '../types';

export const coachingOffers: CoachingOffer[] = [
  {
    id: "etincelle",
    title: "Étincelle",
    icon: "Sparkles",
    description: "Une séance unique pour identifier tes blocages et amorcer le changement",
    benefits: [
      "Trace narrative pour ancrer vos prises de conscience",
      "Option : suivi WhatsApp sur une semaine",
      "Option : call de suivi après une semaine"
    ],
    format: "Une séance unique",
    price: "À partir de 150€*",
    duration: "60 minutes",
    options: [
      {
        title: "Essentiel",
        price: "150€*",
        includes: ["Séance de 60 min", "Trace narrative"]
      },
      {
        title: "Premium",
        price: "300€",
        includes: ["Séance de 60 min", "Documentation narrative", "Suivi WhatsApp (1 semaine)", "Call de suivi"]
      }
    ]
  },
  {
    id: "lightwave",
    title: "Lightwave",
    icon: "Wave",
    description: "Un programme pour retrouver les clés et ouvrir enfin l'espace pour avancer",
    benefits: [
      "Documentation narrative complète",
      "Outils de transformation personnalisés",
      "Option : Inventaire EQ-i et débriefing",
      "Option : Suivi WhatsApp entre les séances"
    ],
    format: "Un accompagnement sur 2 à 3 mois",
    price: "1 500€",
    duration: "2 à 3 mois",
    options: [
      {
        title: "Standard",
        price: "1 500€",
        includes: ["5 séances", "Documentation narrative"]
      },
      {
        title: "EQ-i",
        price: "1 669€",
        includes: ["Programme standard", "Inventaire EQ-i et débriefing"]
      },
      {
        title: "Premium",
        price: "1 700€",
        includes: ["Programme standard", "Suivi WhatsApp entre les séances"]
      }
    ]
  },
  {
    id: "lightning",
    title: "Lightning",
    icon: "Lightning",
    description: "Un coaching sur-mesure pour incarner ton leadership et affirmer ton impact.",
    benefits: [
      "Documentation narrative complète",
      "Suivi WhatsApp tout au long du programme",
      "Inventaire EQ-i Leadership inclus",
      "2 séances de débriefing spécifiques"
    ],
    format: "Un accompagnement intensif",
    price: "3 000€",
    duration: "4 à 6 mois",
    options: [
      {
        title: "Programme complet",
        price: "3 000€",
        includes: [
          "10 séances de coaching",
          "Documentation narrative",
          "Suivi WhatsApp",
          "Inventaire EQ-i Leadership",
          "2 séances de débriefing"
        ]
      }
    ]
  }
];