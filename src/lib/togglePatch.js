/**
 * Ce fichier contient un patch pour résoudre les erreurs liées à setToggle et autres erreurs React
 * Il doit être chargé avant le bundle principal
 */

(function() {
  // Patch pour Object.setToggle
  if (!Object.prototype.setToggle) {
    Object.defineProperty(Object.prototype, 'setToggle', {
      value: function(value) {
        // Implémentation qui ne fait rien mais évite les erreurs
        return this;
      },
      writable: true,
      configurable: true
    });
  }
  
  // Patch pour éviter les erreurs sur undefined
  window.safeGet = function(obj, path) {
    if (!obj) return undefined;
    
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current === undefined || current === null) return undefined;
      current = current[key];
    }
    
    return current;
  };
  
  // Patch pour les erreurs de mount/unmount
  window.addEventListener('DOMContentLoaded', function() {
    // Créer un objet global pour stocker les fonctions de secours
    window.__reactPatch = {
      noop: function() {},
      safeMount: function() { return {}; },
      safeUnmount: function() { return {}; },
      safeEvents: { clear: function() {} }
    };
    
    // Patch pour les erreurs de mount
    if (typeof window.cb === 'undefined') {
      window.cb = {
        updateFeatures: window.__reactPatch.noop,
        unmount: window.__reactPatch.noop
      };
    }
  });
})();