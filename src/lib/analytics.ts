// Version simplifiée et optimisée du système d'analytics

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  try {
    console.log(`[Analytics] Page View: ${path}${title ? ` - ${title}` : ''}`);
  } catch (error) {
    // Silently fail
  }
};

// Track events (quiz completions, form submissions, etc.)
export const trackEvent = (category: string, action: string, label?: string): void => {
  try {
    console.log(`[Analytics] Event: ${category} - ${action}${label ? ` - ${label}` : ''}`);
  } catch (error) {
    // Silently fail
  }
};

// Track quiz answers
export const trackQuizAnswer = (questionNumber: number, question: string, answer: string): void => {
  try {
    trackEvent('Quiz', 'Answer', `Q${questionNumber}: ${answer}`);
  } catch (error) {
    // Silently fail
  }
};

// Track quiz completion
export const trackQuizCompletion = (recommendedOffer: string): void => {
  try {
    trackEvent('Quiz', 'Completion', `Recommended: ${recommendedOffer}`);
  } catch (error) {
    // Silently fail
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean): void => {
  try {
    trackEvent('Form', 'Submission', `${formName} - ${success ? 'Success' : 'Failure'}`);
  } catch (error) {
    // Silently fail
  }
};