/**
 * Module CRM amélioré avec gestion des erreurs et retries
 * 
 * Ce module fournit une interface unifiée pour interagir avec HubSpot CRM
 * avec des fonctionnalités avancées comme les retries et la mise en file d'attente.
 */

import axios from 'axios';
import { createOrUpdateContact, HubSpotContactProperties } from './hubspot-api';

// Types pour les données de contact
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

// Configuration
const HUBSPOT_API_KEY = import.meta.env.VITE_HUBSPOT_API_KEY || '';
const USE_MOCK_CRM = import.meta.env.VITE_USE_MOCK_CRM === 'true';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

/**
 * Fonction utilitaire pour attendre un délai spécifié
 * 
 * @param ms - Délai en millisecondes
 * @returns Promise qui se résout après le délai
 */
const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Implémentation Mock du CRM pour les tests
 * 
 * @param data - Données de contact
 * @returns Résultat de l'opération simulée
 */
const mockCrmSubmit = async (data: ContactData): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    console.log('Mock CRM submission:', data);
    
    // Simuler un délai d'API
    await wait(800);
    
    // Toujours retourner un succès en mode mock
    return {
      success: true,
      id: `mock-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      message: 'Contact successfully added to mock CRM'
    };
  } catch (error) {
    console.error('Error in mock CRM:', error);
    return { 
      success: false, 
      message: 'Mock CRM submission failed' 
    };
  }
};

/**
 * Convertit les données de contact au format HubSpot
 * 
 * @param data - Données de contact
 * @returns Propriétés de contact au format HubSpot
 */
const convertToHubSpotProperties = (data: ContactData): HubSpotContactProperties => {
  // Formater les réponses du quiz pour les propriétés personnalisées HubSpot
  const quizResponsesFormatted = data.quizResponses 
    ? Object.entries(data.quizResponses).map(([key, value]) => `Q${Number(key) + 1}: ${value}`).join(' | ')
    : '';
  
  // Préparer les données pour HubSpot
  return {
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
    phone: data.phone,
    quiz_responses: quizResponsesFormatted,
    recommended_offer: data.recommendedOffer || '',
    source: data.source || 'Website',
    message: data.message || ''
  };
};

/**
 * Implémentation HubSpot du CRM avec retries
 * 
 * @param data - Données de contact
 * @param retryCount - Compteur de tentatives (pour usage interne)
 * @returns Résultat de l'opération
 */
const hubspotSubmit = async (
  data: ContactData, 
  retryCount = 0
): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    console.log(`HubSpot submission attempt ${retryCount + 1}/${MAX_RETRIES + 1}`);
    
    // Convertir les données au format HubSpot
    const hubspotProperties = convertToHubSpotProperties(data);
    
    // Créer ou mettre à jour le contact dans HubSpot
    const result = await createOrUpdateContact(hubspotProperties);
    
    if (result.success) {
      return {
        success: true,
        id: result.id,
        message: 'Contact successfully added to HubSpot'
      };
    } else {
      throw new Error(result.message || 'Unknown error');
    }
  } catch (error) {
    console.error(`Error in HubSpot submission (attempt ${retryCount + 1}):`, error);
    
    // Retry logic
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY}ms...`);
      await wait(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      return hubspotSubmit(data, retryCount + 1);
    }
    
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
      message: `HubSpot submission failed after ${retryCount + 1} attempts` 
    };
  }
};

/**
 * File d'attente pour les soumissions CRM
 */
interface QueueItem {
  data: ContactData;
  resolve: (value: { success: boolean; id?: string; message?: string }) => void;
  reject: (reason?: any) => void;
}

let isProcessingQueue = false;
const submissionQueue: QueueItem[] = [];

/**
 * Traite la file d'attente des soumissions CRM
 */
const processQueue = async (): Promise<void> => {
  if (isProcessingQueue || submissionQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  try {
    const item = submissionQueue.shift();
    if (!item) {
      isProcessingQueue = false;
      return;
    }
    
    try {
      const result = USE_MOCK_CRM 
        ? await mockCrmSubmit(item.data)
        : await hubspotSubmit(item.data);
      
      item.resolve(result);
    } catch (error) {
      item.reject(error);
    }
  } finally {
    isProcessingQueue = false;
    
    // Continuer à traiter la file d'attente s'il reste des éléments
    if (submissionQueue.length > 0) {
      processQueue();
    }
  }
};

/**
 * Ajoute une soumission à la file d'attente
 * 
 * @param data - Données de contact
 * @returns Promise qui se résout avec le résultat de l'opération
 */
const queueSubmission = (data: ContactData): Promise<{ success: boolean; id?: string; message?: string }> => {
  return new Promise((resolve, reject) => {
    submissionQueue.push({ data, resolve, reject });
    processQueue();
  });
};

/**
 * Fonction principale pour soumettre un contact au CRM
 * 
 * @param data - Données de contact
 * @param useQueue - Utiliser la file d'attente (true) ou soumettre immédiatement (false)
 * @returns Résultat de l'opération
 */
export const submitToCrm = async (
  data: ContactData,
  useQueue = false
): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    if (useQueue) {
      return await queueSubmission(data);
    }
    
    if (USE_MOCK_CRM) {
      console.log('Using mock CRM (HubSpot integration disabled)');
      return await mockCrmSubmit(data);
    } else {
      console.log('Using real HubSpot integration');
      return await hubspotSubmit(data);
    }
  } catch (error) {
    console.error('Error in submitToCrm:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

/**
 * Vérifie si le CRM est accessible
 * 
 * @returns Résultat indiquant si le CRM est accessible
 */
export const checkCrmAccess = async (): Promise<{ success: boolean; message: string }> => {
  if (USE_MOCK_CRM) {
    return { success: true, message: 'Mock CRM is always accessible' };
  }
  
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
      message: 'HubSpot API is accessible'
    };
  } catch (error) {
    console.error('Error accessing HubSpot API:', error);
    
    return {
      success: false,
      message: 'HubSpot API is not accessible'
    };
  }
};