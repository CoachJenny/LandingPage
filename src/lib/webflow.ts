const WEBFLOW_API_ENDPOINT = 'https://api.webflow.com/sites/YOUR_SITE_ID';
const WEBFLOW_TOKEN = import.meta.env.VITE_WEBFLOW_TOKEN;

interface WebflowAPIOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

async function fetchWebflow(path: string, options: WebflowAPIOptions = { method: 'GET' }) {
  const response = await fetch(`${WEBFLOW_API_ENDPOINT}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${WEBFLOW_TOKEN}`,
      'accept-version': '1.0.0',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Webflow API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getOffers() {
  return fetchWebflow('/collections/offers/items');
}

export async function getTestimonials() {
  return fetchWebflow('/collections/testimonials/items');
}

export async function getQuizQuestions() {
  return fetchWebflow('/collections/quiz-questions/items');
}

export async function submitQuizResponse(response: Omit<WebflowQuizResponse, '_id' | 'createdAt'>) {
  return fetchWebflow('/collections/quiz-responses/items', {
    method: 'POST',
    body: JSON.stringify(response),
  });
}