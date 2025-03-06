import axios from 'axios';

// Types for CRM data
export interface ContactData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  quizResponses?: Record<number, string>;
  recommendedOffer?: string;
  source?: string;
  message?: string;
}

// Environment variables
const USE_MOCK_CRM = import.meta.env.VITE_USE_MOCK_CRM === 'true';

// Mock CRM implementation
const mockCrmSubmit = async (data: ContactData): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always return success for mock mode
    return {
      success: true,
      id: `mock-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      message: 'Contact successfully added to mock CRM'
    };
  } catch (error) {
    return { 
      success: false, 
      message: 'Mock CRM submission failed' 
    };
  }
};

// HubSpot CRM integration
const hubspotSubmit = async (data: ContactData): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    // Format quiz responses for HubSpot custom properties
    const quizResponsesFormatted = data.quizResponses 
      ? Object.entries(data.quizResponses).map(([key, value]) => `Q${Number(key) + 1}: ${value}`).join(' | ')
      : '';
    
    // Prepare data for HubSpot
    const hubspotData = {
      properties: {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        quiz_responses: quizResponsesFormatted,
        recommended_offer: data.recommendedOffer || '',
        source: data.source || 'Website',
        message: data.message || ''
      }
    };
    
    // Use the Netlify function proxy
    const response = await axios({
      method: 'POST',
      url: '/.netlify/functions/hubspot/crm/v3/objects/contacts',
      headers: {
        'Content-Type': 'application/json'
      },
      data: hubspotData
    });

    return {
      success: true,
      id: response.data?.id,
      message: 'Contact successfully added to HubSpot'
    };
  } catch (error) {
    // Log more details about the error
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    
    return { 
      success: false, 
      message: 'HubSpot submission failed' 
    };
  }
};

// Main function to submit contact to CRM
export const submitToCrm = async (data: ContactData): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    if (USE_MOCK_CRM) {
      return await mockCrmSubmit(data);
    } else {
      return await hubspotSubmit(data);
    }
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};