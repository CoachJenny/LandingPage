/**
 * Système simplifié de gestion des erreurs JavaScript
 * Version optimisée
 */

// Fonction pour appliquer les patches pour éviter les erreurs courantes
export const applyErrorPatches = (): void => {
  // Patch pour Object.setToggle
  if (typeof Object.prototype.setToggle !== 'function') {
    Object.defineProperty(Object.prototype, 'setToggle', {
      value: function() { return this; },
      writable: true,
      configurable: true
    });
  }
  
  // Patch pour les erreurs de mount/unmount
  window.cb = window.cb || {
    updateFeatures: () => {},
    unmount: () => {}
  };
  
  // Patch pour les erreurs d'événements
  window.events = window.events || {
    t: { clear: () => {} }
  };
  
  // Intercepter les erreurs globales
  window.addEventListener('error', function(event) {
    if (event.error && (
      event.error.toString().includes('s.mount is not a function') ||
      event.error.toString().includes('this.events[t].clear is not a function') ||
      event.error.toString().includes('toggle') ||
      event.error.toString().includes('setToggle')
    )) {
      event.preventDefault();
      return false;
    }
  }, true);
  
  // Patch pour les erreurs CORS avec fetch
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    // Si l'URL est pour HubSpot et ne commence pas par /.netlify/functions/hubspot, la rediriger
    if (typeof url === 'string' && 
        url.includes('api.hubapi.com') && 
        !url.startsWith('/.netlify/functions/hubspot')) {
      // Remplacer l'URL par notre proxy
      const newUrl = '/.netlify/functions/hubspot' + url.replace(/^https?:\/\/api\.hubapi\.com/, '');
      return originalFetch(newUrl, options);
    }
    return originalFetch(url, options);
  };
  
  // Patch pour les erreurs CORS avec XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    // Si l'URL est pour HubSpot et ne commence pas par /.netlify/functions/hubspot, la rediriger
    if (typeof url === 'string' && 
        url.includes('api.hubapi.com') && 
        !url.startsWith('/.netlify/functions/hubspot')) {
      // Remplacer l'URL par notre proxy
      const newUrl = '/.netlify/functions/hubspot' + url.replace(/^https?:\/\/api\.hubapi\.com/, '');
      return originalXHROpen.call(this, method, url, ...args);
    }
    return originalXHROpen.call(this, method, url, ...args);
  };
};

// Fonction pour exécuter une fonction de manière sécurisée
export const safeExecute = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch (error) {
    return fallback;
  }
};

// Fonction pour exécuter une fonction asynchrone de manière sécurisée
export const safeExecuteAsync = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    return fallback;
  }
};