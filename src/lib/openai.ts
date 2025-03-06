import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface QuizRequest {
  type: 'next_question' | 'final_synthesis';
  currentQuestion?: number;
  previousAnswers?: Record<number, string>;
  answers?: Record<number, string>;
  contactInfo?: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
}

const JENNY_COACH_INSTRUCTIONS = `Tu es Jenny Coach, une coach professionnelle spécialisée dans l'accompagnement des personnes en transition professionnelle.

RÈGLES IMPORTANTES :
1. Pour les questions :
   - Les 3 premières questions (0-2) sont à choix multiples
   - Les 3 dernières questions (3-5) sont des questions ouvertes
   - Questions personnalisées basées sur les réponses précédentes
   - Inviter à la réflexion profonde mais guidée
   - Éviter les questions trop vagues ou générales

2. Format des questions à choix multiples :
   - Question claire et directe
   - 4 options de réponse pertinentes
   - Options reflétant différentes situations/besoins
   - Format JSON :
   {
     "question": "...",
     "type": "multiple",
     "options": ["...", "...", "...", "..."]
   }

3. Format des questions ouvertes :
   {
     "question": "...",
     "type": "open"
   }

4. Pour la synthèse :
   - Identifier le besoin principal et les enjeux sous-jacents
   - Proposer une première piste d'action concrète
   - Recommander le programme le plus adapté :
     * Étincelle (1 séance) : pour un besoin ponctuel
     * Lightwave (5 séances) : pour un changement progressif
     * Lightning (10 séances) : pour une transformation profonde
   - Terminer par une question puissante personnalisée

5. Style de communication :
   - Bienveillant et empathique
   - Direct et concret
   - Professionnel mais chaleureux
   - Orienté solutions`;

export const generateQuizResponse = async (request: QuizRequest): Promise<string> => {
  try {
    let prompt = '';
    
    if (request.type === 'next_question') {
      const isMultipleChoice = request.currentQuestion !== undefined && request.currentQuestion < 3;
      
      prompt = `En tenant compte des réponses précédentes : ${JSON.stringify(request.previousAnswers)}, 
      génère la ${isMultipleChoice ? 'question à choix multiples' : 'question ouverte'} suivante (question ${request.currentQuestion}/6).
      
      IMPORTANT :
      - Question personnalisée et réflexive
      - En lien avec les réponses précédentes
      - Format JSON attendu : ${isMultipleChoice ? 
        '{"question": "...", "type": "multiple", "options": ["...", "...", "...", "..."]}' : 
        '{"question": "...", "type": "open"}'
      }`;
    } else if (request.type === 'final_synthesis') {
      const { answers, contactInfo } = request;
      prompt = `Analyse ces réponses : ${JSON.stringify(answers)}
      
      Génère une synthèse personnalisée pour ${contactInfo?.firstName} avec :
      1. Le besoin principal identifié (1-2 phrases)
      2. Les enjeux sous-jacents repérés (1-2 phrases)
      3. Une première action concrète recommandée (1 phrase)
      4. Le programme recommandé avec justification (2 phrases)
      5. Une question puissante personnalisée pour approfondir

      Format de réponse souhaité :
      {
        "synthesis": "...",
        "powerQuestion": "..."
      }`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: JENNY_COACH_INSTRUCTIONS
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Erreur lors de la génération de la réponse:', error);
    throw error;
  }
};