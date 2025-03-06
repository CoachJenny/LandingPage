/**
 * Patches JavaScript pour éviter les erreurs courantes
 * Version optimisée
 */

(function() {
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

  // Patch pour Object.setToggle
  if (!Object.prototype.setToggle) {
    Object.defineProperty(Object.prototype, 'setToggle', {
      value: function() { return this; },
      writable: true,
      configurable: true
    });
  }
  
  // Patch pour les erreurs de mount/unmount
  window.cb = window.cb || {
    updateFeatures: function() {},
    unmount: function() {}
  };
  
  // Patch pour les erreurs d'événements
  window.events = window.events || { 
    t: { clear: function() {} }
  };
  
  // Patch pour les erreurs CORS
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
  
  // Patch pour les erreurs XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    // Si l'URL est pour HubSpot et ne commence pas par /.netlify/functions/hubspot, la rediriger
    if (typeof url === 'string' && 
        url.includes('api.hubapi.com') && 
        !url.startsWith('/.netlify/functions/hubspot')) {
      // Remplacer l'URL par notre proxy
      const newUrl = '/.netlify/functions/hubspot' + url.replace(/^https?:\/\/api\.hubapi\.com/, '');
      return originalXHROpen.call(this, method, newUrl, ...args);
    }
    return originalXHROpen.call(this, method, url, ...args);
  };
})();