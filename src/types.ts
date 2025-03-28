export interface CoachingOffer {
  id: string;
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  format: string;
  price: string;
  duration: string;
  options: {
    title: string;
    price: string;
    includes: string[];
  }[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple' | 'open';
  options: string[];
}

export interface QuizSynthesis {
  mainText: string;
  recommendedOffer: 'etincelle' | 'lightwave' | 'lightning';
}