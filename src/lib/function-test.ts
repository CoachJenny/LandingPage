/**
 * Utilitaire pour tester les fonctions Netlify
 */

import axios from 'axios';

/**
 * Vérifie si les fonctions Netlify sont correctement déployées
 * @returns Résultat du test
 */
export const checkNetlifyFunctions = async (): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> => {
  try {
    console.log('Testing Netlify Functions...');
    
    // Test the test function
    const testResponse = await axios.get('/.netlify/functions/test');
    console.log('Test function response:', testResponse.data);
    
    // If we got here, the test function is working
    return {
      success: true,
      data: testResponse.data
    };
  } catch (error) {
    console.error('Error testing Netlify Functions:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Vérifie si la fonction HubSpot est correctement déployée
 * @returns Résultat du test
 */
export const testHubSpotFunction = async (): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> => {
  try {
    console.log('Testing HubSpot function...');
    
    // Test a simple GET request to the HubSpot function
    const response = await axios.get('/.netlify/functions/hubspot/crm/v3/properties/contacts', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('HubSpot function response status:', response.status);
    
    return {
      success: true,
      data: {
        status: response.status,
        statusText: response.statusText,
        hasData: !!response.data
      }
    };
  } catch (error) {
    console.error('Error testing HubSpot function:', error);
    
    // If we get a 401 Unauthorized, that means the function is working but the API key is invalid
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: true,
        data: {
          status: 401,
          statusText: 'Unauthorized - Function is working but API key may be invalid',
          error: error.response?.data
        }
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Vérifie directement l'URL de l'API HubSpot
 * @returns Résultat du test
 */
export const testDirectHubSpotAccess = async (): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> => {
  try {
    console.log('Testing direct HubSpot access...');
    
    // Test a direct request to HubSpot API (this should fail with CORS error)
    const response = await axios.get('https://api.hubapi.com/crm/v3/properties/contacts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_HUBSPOT_API_KEY}`
      },
      timeout: 5000 // 5 second timeout
    });
    
    // If we get here, there's no CORS error (unusual)
    return {
      success: true,
      data: {
        status: response.status,
        statusText: response.statusText,
        message: 'Direct access to HubSpot API works (no CORS error)'
      }
    };
  } catch (error) {
    console.error('Error testing direct HubSpot access:', error);
    
    // Check if it's a CORS error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isCorsError = errorMessage.includes('CORS') || 
                        errorMessage.includes('cross-origin') ||
                        errorMessage.includes('Cross-Origin');
    
    if (isCorsError) {
      return {
        success: false,
        error: 'CORS error detected - This is expected and confirms the need for a proxy',
        data: {
          message: errorMessage,
          isCorsError: true
        }
      };
    }
    
    // If it's an authentication error, that's actually good - means CORS isn't blocking
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: true,
        data: {
          status: 401,
          statusText: 'Unauthorized - But no CORS error, which is unusual',
          message: 'Authentication failed but request went through (no CORS error)'
        }
      };
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};