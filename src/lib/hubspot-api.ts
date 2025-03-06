/**
 * Module d'intégration HubSpot
 * 
 * Ce module fournit des fonctions pour interagir avec l'API HubSpot
 * en utilisant le proxy configuré dans Netlify/Vite.
 */

import axios from 'axios';

// Types pour les propriétés de contact HubSpot
export interface HubSpotContactProperties {
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
  quiz_responses?: string;
  recommended_offer?: string;
  source?: string;
  message?: string;
  [key: string]: any; // Pour les propriétés personnalisées supplémentaires
}

// Interface pour les résultats des opérations HubSpot
export interface HubSpotResult {
  success: boolean;
  id?: string;
  data?: any;
  error?: any;
  message?: string;
}

/**
 * Crée ou met à jour un contact dans HubSpot
 * 
 * @param properties - Propriétés du contact à créer/mettre à jour
 * @returns Résultat de l'opération
 */
export const createOrUpdateContact = async (properties: HubSpotContactProperties): Promise<HubSpotResult> => {
  try {
    console.log('Creating/updating HubSpot contact with properties:', properties);
    
    const response = await axios({
      method: 'POST',
      url: '/hubspot-api/crm/v3/objects/contacts',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { properties }
    });
    
    console.log('HubSpot response:', response.data);
    
    return {
      success: true,
      id: response.data.id,
      data: response.data,
      message: 'Contact created/updated successfully'
    };
  } catch (error) {
    console.error('Error creating/updating HubSpot contact:', error);
    
    // Log more details about the error
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }
    
    return {
      success: false,
      error,
      message: 'Failed to create/update contact in HubSpot'
    };
  }
};

/**
 * Ajoute un contact à une liste statique HubSpot
 * 
 * @param listId - ID de la liste HubSpot
 * @param email - Email du contact à ajouter
 * @returns Résultat de l'opération
 */
export const addContactToList = async (listId: number, email: string): Promise<HubSpotResult> => {
  try {
    console.log(`Adding contact ${email} to list ${listId}`);
    
    const response = await axios({
      method: 'POST',
      url: `/hubspot-api/contacts/v1/lists/${listId}/add`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        emails: [email]
      }
    });
    
    console.log('HubSpot list addition response:', response.data);
    
    return {
      success: true,
      data: response.data,
      message: 'Contact added to list successfully'
    };
  } catch (error) {
    console.error('Error adding contact to HubSpot list:', error);
    
    return {
      success: false,
      error,
      message: 'Failed to add contact to list'
    };
  }
};

/**
 * Récupère toutes les listes HubSpot
 * 
 * @returns Liste des listes HubSpot
 */
export const getLists = async (): Promise<HubSpotResult> => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/hubspot-api/contacts/v1/lists',
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Lists retrieved successfully'
    };
  } catch (error) {
    console.error('Error getting HubSpot lists:', error);
    
    return {
      success: false,
      error,
      message: 'Failed to retrieve lists'
    };
  }
};

/**
 * Crée une nouvelle liste statique ou dynamique dans HubSpot
 * 
 * @param name - Nom de la liste
 * @param dynamic - Si la liste est dynamique (true) ou statique (false)
 * @returns Résultat de l'opération
 */
export const createList = async (name: string, dynamic: boolean = false): Promise<HubSpotResult> => {
  try {
    console.log(`Creating new ${dynamic ? 'dynamic' : 'static'} list: ${name}`);
    
    const response = await axios({
      method: 'POST',
      url: '/hubspot-api/contacts/v1/lists',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name,
        dynamic
      }
    });
    
    console.log('HubSpot list creation response:', response.data);
    
    return {
      success: true,
      id: response.data.listId,
      data: response.data,
      message: 'List created successfully'
    };
  } catch (error) {
    console.error('Error creating HubSpot list:', error);
    
    return {
      success: false,
      error,
      message: 'Failed to create list'
    };
  }
};

/**
 * Recherche un contact par email
 * 
 * @param email - Email du contact à rechercher
 * @returns Résultat de l'opération avec les données du contact
 */
export const findContactByEmail = async (email: string): Promise<HubSpotResult> => {
  try {
    console.log(`Searching for contact with email: ${email}`);
    
    const response = await axios({
      method: 'GET',
      url: `/hubspot-api/crm/v3/objects/contacts/search`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email
              }
            ]
          }
        ]
      }
    });
    
    console.log('HubSpot search response:', response.data);
    
    if (response.data.results && response.data.results.length > 0) {
      return {
        success: true,
        id: response.data.results[0].id,
        data: response.data.results[0],
        message: 'Contact found'
      };
    } else {
      return {
        success: false,
        message: 'Contact not found'
      };
    }
  } catch (error) {
    console.error('Error searching for HubSpot contact:', error);
    
    return {
      success: false,
      error,
      message: 'Failed to search for contact'
    };
  }
};

/**
 * Vérifie si l'API HubSpot est accessible
 * 
 * @returns Résultat indiquant si l'API est accessible
 */
export const checkHubSpotAccess = async (): Promise<HubSpotResult> => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/hubspot-api/crm/v3/properties/contacts',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return {
      success: true,
      data: response.data,
      message: 'HubSpot API is accessible'
    };
  } catch (error) {
    console.error('Error accessing HubSpot API:', error);
    
    return {
      success: false,
      error,
      message: 'HubSpot API is not accessible'
    };
  }
};