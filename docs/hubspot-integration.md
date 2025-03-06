# Documentation de l'intégration HubSpot

## Vue d'ensemble

Ce document détaille l'intégration de HubSpot CRM dans le site web de coaching. L'intégration permet de :
- Collecter les informations de contact des formulaires
- Enregistrer les réponses au quiz
- Stocker les recommandations d'offres de coaching

## Architecture

L'intégration utilise une approche de proxy pour contourner les limitations CORS :

```
Frontend → Proxy Netlify → API HubSpot
```

### Composants clés

1. **Proxy Netlify** : Configuré dans `netlify.toml` pour rediriger les requêtes vers l'API HubSpot
2. **Module CRM** : Implémenté dans `src/lib/crm.ts`
3. **Gestion des erreurs CORS** : Patches dans `public/errorPatches.js`

## Configuration

### Fichier .env

```
VITE_HUBSPOT_API_KEY=pat-na1-dc9c69e5-2f6c-4a6f-932e-ccdf7a4bb667
VITE_USE_MOCK_CRM=false
```

- `VITE_HUBSPOT_API_KEY` : Clé API HubSpot pour l'authentification
- `VITE_USE_MOCK_CRM` : Bascule entre le mode réel et le mode simulé

### Configuration Netlify (netlify.toml)

```toml
[[redirects]]
  from = "/hubspot-api/*"
  to = "https://api.hubapi.com/:splat"
  status = 200
  force = true
  headers = {Authorization = "Bearer ${VITE_HUBSPOT_API_KEY}"}
```

Cette configuration :
- Redirige toutes les requêtes de `/hubspot-api/*` vers `https://api.hubapi.com/*`
- Ajoute automatiquement l'en-tête d'autorisation avec la clé API

### Configuration Vite (vite.config.ts)

```typescript
server: {
  proxy: {
    '/hubspot-api': {
      target: 'https://api.hubapi.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/hubspot-api/, ''),
      headers: {
        'Authorization': `Bearer ${process.env.VITE_HUBSPOT_API_KEY}`
      }
    }
  }
}
```

Cette configuration permet au serveur de développement de Vite de proxifier les requêtes vers HubSpot.

## Implémentation du CRM (src/lib/crm.ts)

### Interface ContactData

```typescript
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
```

### Fonction principale : submitToCrm

```typescript
export const submitToCrm = async (data: ContactData): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
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
```

### Implémentation HubSpot

```typescript
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
    
    // Utiliser une requête directe à l'API HubSpot via le proxy Netlify
    const response = await axios({
      method: 'POST',
      url: '/hubspot-api/crm/v3/objects/contacts',
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
    console.error('Error in HubSpot submission:', error);
    
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
      message: 'HubSpot submission failed' 
    };
  }
};
```

### Implémentation Mock

```typescript
const mockCrmSubmit = async (data: ContactData): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    console.log('Mock CRM submission:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always return success for mock mode
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
```

## Utilisation dans les composants

### ContactForm.tsx

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    console.log('Submitting contact form:', formData);
    
    // Submit to CRM
    const result = await submitToCrm({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      source: source,
      message: formData.message
    });
    
    console.log('Contact form submission result:', result);
    
    // Show success message and mark as submitted
    setSubmitted(true);
    toast.success("Votre message a bien été envoyé !");
    
    trackFormSubmission('Contact Form', result.success);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Still show success to user for better UX
    setSubmitted(true);
    toast.success("Votre message a bien été envoyé !");
    
    trackFormSubmission('Contact Form', false);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Quiz.tsx

```typescript
const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmissionAttempted(true);
  
  try {
    // Get synthesis before submitting to CRM
    const quizSynthesis = getSynthesis(answers);
    setSynthesis(quizSynthesis);
    
    // Track quiz completion
    trackQuizCompletion(quizSynthesis.recommendedOffer);
    
    // Submit to CRM
    try {
      const result = await submitToCrm({
        email: contactInfo.email,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        phone: contactInfo.phone,
        quizResponses: answers,
        recommendedOffer: quizSynthesis.recommendedOffer,
        source: 'Quiz'
      });
      
      console.log('CRM submission result:', result);
      
      // Show success message
      setShowContactForm(false);
      setShowSynthesis(true);
      toast.success("Merci pour vos réponses !");
      
      trackFormSubmission('Quiz Contact Form', result.success);
      
      // Show offer CTA after a short delay
      setTimeout(() => {
        setShowOfferCTA(true);
      }, 1000);
    } catch (crmError) {
      console.error('Error submitting to CRM:', crmError);
      
      // Still show synthesis to user for better UX
      setShowContactForm(false);
      setShowSynthesis(true);
      toast.success("Merci pour vos réponses !");
      
      trackFormSubmission('Quiz Contact Form', false);
      
      // Show offer CTA after a short delay
      setTimeout(() => {
        setShowOfferCTA(true);
      }, 1000);
    }
  } catch (error) {
    console.error('Error submitting quiz:', error);
    toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    setHasError(true);
    
    trackFormSubmission('Quiz Contact Form', false);
  } finally {
    setIsSubmitting(false);
  }
};
```

## Gestion des erreurs CORS

### Patches JavaScript (public/errorPatches.js)

```javascript
// Patch pour les erreurs CORS
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // Si l'URL est pour HubSpot et ne commence pas par /hubspot-api, la rediriger
  if (typeof url === 'string' && 
      (url.includes('api.hubapi.com') || url.includes('hubspot')) && 
      !url.startsWith('/hubspot-api')) {
    // Remplacer l'URL par notre proxy
    const newUrl = '/hubspot-api' + url.replace(/^https?:\/\/api\.hubapi\.com/, '');
    console.log(`[CORS Proxy] Redirecting ${url} to ${newUrl}`);
    return originalFetch(newUrl, options);
  }
  return originalFetch(url, options);
};

// Patch pour les erreurs XMLHttpRequest
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...args) {
  // Si l'URL est pour HubSpot et ne commence pas par /hubspot-api, la rediriger
  if (typeof url === 'string' && 
      (url.includes('api.hubapi.com') || url.includes('hubspot')) && 
      !url.startsWith('/hubspot-api')) {
    // Remplacer l'URL par notre proxy
    const newUrl = '/hubspot-api' + url.replace(/^https?:\/\/api\.hubapi\.com/, '');
    console.log(`[CORS Proxy] Redirecting XHR ${url} to ${newUrl}`);
    return originalXHROpen.call(this, method, newUrl, ...args);
  }
  return originalXHROpen.call(this, method, url, ...args);
};
```

## Propriétés HubSpot personnalisées

Pour que l'intégration fonctionne correctement, les propriétés personnalisées suivantes doivent être créées dans HubSpot :

1. **quiz_responses** (Multi-line text)
   - Stocke les réponses au quiz formatées

2. **recommended_offer** (Single-line text)
   - Stocke l'offre recommandée basée sur les réponses au quiz

3. **source** (Single-line text)
   - Indique la source du contact (Quiz, Contact Form, etc.)

## Dépannage

### Erreurs CORS courantes

```
Access to XMLHttpRequest at 'https://api.hubapi.com/crm/v3/objects/contacts' from origin 'https://beamish-rolypoly-74f5ed.netlify.app' has been blocked by CORS policy
```

**Solution** : Vérifier que les redirections Netlify sont correctement configurées et que la clé API est valide.

### Erreurs d'authentification

```
401 Unauthorized
```

**Solution** : Vérifier que la clé API HubSpot est correcte et qu'elle a les permissions nécessaires.

### Mode Mock

Pour tester sans utiliser l'API HubSpot réelle, définir `VITE_USE_MOCK_CRM=true` dans le fichier `.env`.

## Améliorations possibles

1. **Mise en file d'attente des requêtes** : Implémenter un système de file d'attente pour les requêtes en cas d'échec temporaire.

2. **Synchronisation bidirectionnelle** : Permettre de récupérer des données depuis HubSpot pour personnaliser l'expérience utilisateur.

3. **Webhooks HubSpot** : Configurer des webhooks pour être notifié des changements dans HubSpot.

4. **Segmentation avancée** : Utiliser les listes HubSpot pour segmenter les contacts en fonction de leurs réponses au quiz.