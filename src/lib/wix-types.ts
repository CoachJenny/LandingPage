// Types pour la structure Wix
export interface WixOffer {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
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

export interface WixTestimonial {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
}

export interface WixQuizQuestion {
  _id: string;
  question: string;
  type: 'multiple' | 'open';
  options?: string[];
  nextQuestionLogic?: {
    answer: string;
    nextQuestionId: string;
  }[];
}

export interface WixQuizResponse {
  _id: string;
  answers: {
    questionId: string;
    answer: string;
  }[];
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  recommendedOffer: string;
  createdAt: string;
}