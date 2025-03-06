import { QuizQuestion, QuizSynthesis } from '../types';

export const initialQuestion: QuizQuestion = {
  id: 1,
  question: "Si tu devais résumer ta situation actuelle en une phrase, ce serait plutôt :",
  type: "multiple",
  options: [
    "Je suis bloqué.e, je ne sais plus quelle direction prendre.",
    "J'avance, mais j'ai l'impression qu'il me manque quelque chose.",
    "Je ressens un besoin profond de transformation."
  ]
};

export const getNextQuestion = (previousAnswers: Record<number, string>): QuizQuestion => {
  const lastAnswerIndex = Object.keys(previousAnswers).length;
  const lastAnswer = previousAnswers[lastAnswerIndex - 1];

  if (lastAnswerIndex === 1) {
    switch (lastAnswer) {
      case "Je suis bloqué.e, je ne sais plus quelle direction prendre.":
        return {
          id: 2,
          question: "Qu'est-ce qui t'empêche d'avancer ?",
          type: "multiple",
          options: [
            "Je ne sais plus ce que je veux réellement.",
            "J'ai peur de faire un mauvais choix.",
            "Je me sens épuisé.e et démotivé.e."
          ]
        };
      case "J'avance, mais j'ai l'impression qu'il me manque quelque chose.":
        return {
          id: 2,
          question: "Qu'est-ce qui ferait la différence pour toi aujourd'hui ?",
          type: "multiple",
          options: [
            "Une vision plus claire de mon prochain objectif.",
            "Gérer mes émotions et mon stress avec plus de sérénité.",
            "M'affirmer davantage et gagner en impact."
          ]
        };
      default:
        return {
          id: 2,
          question: "Quelle transformation t'attire le plus ?",
          type: "multiple",
          options: [
            "Gagner en confiance et en clarté sur ce que je veux.",
            "Améliorer mes relations et ma communication.",
            "Me reconnecter au plaisir et au sens dans mon quotidien."
          ]
        };
    }
  }

  if (lastAnswerIndex === 2) {
    const answerA = previousAnswers[0];
    const answerB = previousAnswers[1];

    if (answerA === "Je suis bloqué.e, je ne sais plus quelle direction prendre.") {
      if (answerB === "Je ne sais plus ce que je veux réellement.") {
        return {
          id: 3,
          question: "Si tu pouvais appuyer sur pause et regarder ta situation de l'extérieur, que verrais-tu ?",
          type: "multiple",
          options: [
            "Un brouillard mental, tout est flou.",
            "Beaucoup d'idées, mais aucune ne semble la bonne.",
            "Une impression d'attendre quelque chose sans savoir quoi."
          ]
        };
      }
      if (answerB === "J'ai peur de faire un mauvais choix.") {
        return {
          id: 3,
          question: "Quel serait le pire scénario… et est-ce vraiment si grave ?",
          type: "multiple",
          options: [
            "Je regretterais ma décision.",
            "Je me rendrais compte que j'ai perdu du temps.",
            "Je me retrouverais dans une impasse encore plus grande."
          ]
        };
      }
      return {
        id: 3,
        question: "Quand as-tu ressenti de l'énergie pour la dernière fois ?",
        type: "multiple",
        options: [
          "Quand j'étais pleinement absorbé.e par un projet.",
          "Quand j'avais un vrai but à atteindre.",
          "Quand j'étais entouré.e de personnes inspirantes."
        ]
      };
    }

    if (answerA === "J'avance, mais j'ai l'impression qu'il me manque quelque chose.") {
      if (answerB === "Une vision plus claire de mon prochain objectif.") {
        return {
          id: 3,
          question: "Si tu avais cette clarté, qu'est-ce qui changerait pour toi ?",
          type: "multiple",
          options: [
            "Je prendrais enfin une décision.",
            "Je me sentirais plus serein.e au quotidien.",
            "Je passerais immédiatement à l'action."
          ]
        };
      }
      if (answerB === "Gérer mes émotions et mon stress avec plus de sérénité.") {
        return {
          id: 3,
          question: "Quand tu ressens du stress, comment réagis-tu instinctivement ?",
          type: "multiple",
          options: [
            "Je me referme sur moi-même.",
            "Je ressens une pression qui m'empêche de réfléchir.",
            "J'essaie de faire comme si de rien n'était."
          ]
        };
      }
      return {
        id: 3,
        question: "Quand as-tu senti que ta voix portait vraiment ?",
        type: "multiple",
        options: [
          "Quand j'ai pris la parole avec conviction.",
          "Quand j'ai osé dire ce que je pensais sans peur du jugement.",
          "Quand j'ai posé une limite claire."
        ]
      };
    }

    if (answerB === "Gagner en confiance et en clarté sur ce que je veux.") {
      return {
        id: 3,
        question: "Si tu t'autorisais à suivre ton intuition, que ferais-tu en premier ?",
        type: "multiple",
        options: [
          "J'explorerais de nouvelles pistes sans me juger.",
          "Je poserais des actions concrètes sans chercher à tout maîtriser.",
          "Je demanderais de l'aide et du soutien."
        ]
      };
    }
    if (answerB === "Améliorer mes relations et ma communication.") {
      return {
        id: 3,
        question: "Dans tes interactions, qu'est-ce qui te pose le plus de difficulté ?",
        type: "multiple",
        options: [
          "Exprimer clairement mes besoins.",
          "Gérer les conflits et les tensions.",
          "Ne pas être influencé.e par les attentes des autres."
        ]
      };
    }
    return {
      id: 3,
      question: "Quand tu ressens de la joie, qu'est-ce qui la provoque ?",
      type: "multiple",
      options: [
        "Créer et expérimenter sans pression.",
        "Avoir du temps pour moi et ce qui me nourrit.",
        "Partager et transmettre ce qui m'anime."
      ]
    };
  }

  return initialQuestion;
};

export const getSynthesis = (answers: Record<number, string>): QuizSynthesis => {
  const answerA = answers[0];
  const answerB = answers[1];
  const answerC = answers[2];

  if (answerA === "Je suis bloqué.e, je ne sais plus quelle direction prendre.") {
    if (answerB === "Je ne sais plus ce que je veux réellement.") {
      return {
        mainText: answerC === "Un brouillard mental, tout est flou." 
          ? "Ce brouillard mental qui t'entoure est en réalité un signe que tu es prêt.e à faire émerger quelque chose de nouveau. Ensemble, nous pouvons transformer cette confusion en clarté et faire de ce moment de questionnement une opportunité de réalignement profond."
          : answerC === "Beaucoup d'idées, mais aucune ne semble la bonne."
          ? "Cette abondance d'idées est une richesse, même si elle peut sembler paralysante. La clé n'est pas de trouver LA bonne idée, mais d'apprendre à faire confiance à ton intuition pour explorer celle qui résonne le plus avec qui tu es vraiment."
          : "Cette attente que tu ressens cache peut-être une sagesse intérieure qui demande à être écoutée. Il est temps d'explorer ce qui se cache derrière cette sensation et de transformer cette pause en tremplin vers ton prochain chapitre.",
        recommendedOffer: "lightwave"
      };
    }
    if (answerB === "J'ai peur de faire un mauvais choix.") {
      return {
        mainText: answerC === "Je regretterais ma décision."
          ? "La peur du regret te maintient dans une forme de paralysie. Et si le vrai risque n'était pas de faire un mauvais choix, mais de ne pas choisir du tout ? Ensemble, nous pouvons transformer cette peur en carburant pour avancer avec discernement."
          : answerC === "Je me rendrais compte que j'ai perdu du temps."
          ? "Le temps n'est jamais vraiment perdu quand il nous permet d'apprendre et de grandir. Ta préoccupation du temps qui passe révèle peut-être un désir profond de vivre pleinement, d'être enfin dans l'action plutôt que dans l'hésitation."
          : "Cette crainte de l'impasse révèle ta capacité à anticiper et à vouloir bien faire. Transformons cette vigilance en force pour créer un chemin qui te correspond vraiment, avec des options et des alternatives.",
        recommendedOffer: "etincelle"
      };
    }
    return {
      mainText: answerC === "Quand j'étais pleinement absorbé.e par un projet."
        ? "Ces moments d'absorption totale sont de précieux indicateurs de ce qui t'anime vraiment. Ils révèlent un alignement naturel entre tes talents et tes actions. Explorons ensemble comment créer davantage de ces moments dans ton quotidien professionnel."
        : answerC === "Quand j'avais un vrai but à atteindre."
        ? "La clarté d'un objectif qui fait sens pour toi est visiblement un puissant moteur. Il est temps de redéfinir ce qui donne du sens à ton parcours et de construire une vision qui t'inspire vraiment à passer à l'action."
        : "L'énergie que tu puises dans les interactions inspirantes montre l'importance de l'environnement dans ta motivation. Créons ensemble les conditions pour que tu puisses cultiver et attirer ces connexions énergisantes dans ton parcours.",
      recommendedOffer: "lightning"
    };
  }

  if (answerA === "J'avance, mais j'ai l'impression qu'il me manque quelque chose.") {
    if (answerB === "Une vision plus claire de mon prochain objectif.") {
      return {
        mainText: answerC === "Je prendrais enfin une décision."
          ? "Tu as déjà toutes les cartes en main pour prendre cette décision. Ce qui te manque, c'est peut-être la confiance dans ta capacité à choisir. Ensemble, nous pouvons clarifier tes critères de décision et renforcer ta confiance dans tes choix."
          : answerC === "Je me sentirais plus serein.e au quotidien."
          ? "Cette recherche de sérénité à travers la clarté montre une belle conscience de tes besoins. Travaillons ensemble à construire cette vision qui t'apportera non seulement de la clarté, mais aussi l'ancrage et la confiance que tu recherches."
          : "Ton désir d'action immédiate révèle une belle énergie prête à être canalisée. Construisons ensemble une vision claire qui transformera cette impatience en force motrice pour des actions alignées avec tes objectifs.",
        recommendedOffer: "lightning"
      };
    }
    if (answerB === "Gérer mes émotions et mon stress avec plus de sérénité.") {
      return {
        mainText: answerC === "Je me referme sur moi-même."
          ? "Ce repli sur soi face au stress est un mécanisme de protection qui a peut-être eu son utilité, mais qui aujourd'hui te limite. Ensemble, nous pouvons développer de nouvelles stratégies pour transformer ces moments de tension en opportunités de croissance."
          : answerC === "Je ressens une pression qui m'empêche de réfléchir."
          ? "Cette pression qui paralyse ta réflexion est un signal important. Il est temps d'apprendre à transformer cette énergie de stress en force motrice, en développant des outils concrets pour garder ta clarté même sous pression."
          : "Faire comme si de rien n'était demande beaucoup d'énergie et peut créer un décalage entre ce que tu vis et ce que tu montres. Explorons ensemble comment accueillir ces émotions pour en faire des alliées plutôt que des obstacles.",
        recommendedOffer: "lightwave"
      };
    }
    return {
      mainText: answerC === "Quand j'ai pris la parole avec conviction."
        ? "Ces moments où ta voix porte sont des révélateurs de ta puissance intérieure. Il est temps d'ancrer cette conviction pour qu'elle devienne ta nouvelle normalité, pas juste des moments isolés."
        : answerC === "Quand j'ai osé dire ce que je pensais sans peur du jugement."
        ? "Cette libération de la peur du jugement a été un moment clé pour toi. Ensemble, nous pouvons faire de cette authenticité ta nouvelle force, transformant la crainte du regard des autres en confiance en ta propre voix."
        : "Poser des limites claires est un acte de respect envers soi-même. Cette expérience positive montre que tu es prêt.e à prendre ta place pleinement, dans le respect de tes besoins et de tes valeurs.",
      recommendedOffer: "lightning"
    };
  }

  if (answerA === "Je ressens un besoin profond de transformation.") {
    if (answerB === "Gagner en confiance et en clarté sur ce que je veux.") {
      return {
        mainText: answerC === "J'explorerais de nouvelles pistes sans me juger."
          ? "Cette envie d'exploration sans jugement est la clé d'une transformation authentique. Ensemble, nous pouvons créer cet espace sécurisant où tu pourras enfin déployer tes ailes sans le poids de l'auto-critique."
          : answerC === "Je poserais des actions concrètes sans chercher à tout maîtriser."
          ? "Ton désir d'action malgré l'incertitude montre une belle maturité. Il est temps de transformer ce besoin de contrôle en confiance dans ta capacité à t'adapter et à grandir à travers l'expérience."
          : "Reconnaître ton besoin de soutien est une force, pas une faiblesse. Créons ensemble ce cercle de confiance qui te permettra d'avancer avec plus d'assurance vers tes objectifs.",
        recommendedOffer: "lightwave"
      };
    }
    if (answerB === "Améliorer mes relations et ma communication.") {
      return {
        mainText: answerC === "Exprimer clairement mes besoins."
          ? "La clarté dans l'expression de tes besoins est fondamentale pour des relations authentiques et équilibrées. Ensemble, nous pouvons développer cette capacité à communiquer avec assertivité et bienveillance."
          : answerC === "Gérer les conflits et les tensions."
          ? "Les conflits peuvent être des opportunités de croissance quand on sait les aborder. Développons ensemble les outils pour transformer ces moments de tension en occasions de renforcer tes relations."
          : "Cette sensibilité aux attentes des autres peut être transformée en force. Il est temps d'apprendre à honorer ta vérité tout en maintenant des relations harmonieuses.",
        recommendedOffer: "lightning"
      };
    }
    return {
      mainText: answerC === "Créer et expérimenter sans pression."
        ? "Cet élan créatif qui t'anime est une source précieuse de joie et de renouveau. Ensemble, nous pouvons créer les conditions pour que cette créativité s'exprime pleinement dans ton parcours professionnel."
        : answerC === "Avoir du temps pour moi et ce qui me nourrit."
        ? "Ce besoin de temps pour toi révèle une belle conscience de l'importance de se ressourcer. Construisons ensemble un équilibre qui te permette de te nourrir tout en avançant vers tes objectifs."
        : "Ton désir de partage et de transmission est une force motrice puissante. Il est temps de clarifier ton message et de trouver ta façon unique de l'exprimer dans le monde.",
      recommendedOffer: "lightning"
    };
  }

  return {
    mainText: "Tes réponses révèlent un besoin d'évolution et de transformation. Un accompagnement personnalisé t'aidera à clarifier ta situation et à avancer avec plus de confiance.",
    recommendedOffer: "lightwave"
  };
};