// Types pour la structure Webflow CMS
export interface WebflowOffer {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
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

export interface WebflowTestimonial {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
}

export interface WebflowQuizQuestion {
  _id: string;
  questionText: string;
  type: 'multiple' | 'open';
  options?: string[];
  nextQuestionLogic?: {
    answer: string;
    nextQuestionId: string;
  }[];
}

export interface WebflowQuizResponse {
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