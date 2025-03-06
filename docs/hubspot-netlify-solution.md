# Solution CORS HubSpot avec Netlify Functions

## Vue d'ensemble

Cette solution résout les problèmes CORS rencontrés lors de l'intégration avec l'API HubSpot en utilisant les Netlify Functions comme proxy sécurisé.

## Problème initial

Les requêtes directes du navigateur vers l'API HubSpot échouent avec des erreurs CORS :

```
Access to XMLHttpRequest at 'https://api.hubapi.com/crm/v3/objects/contacts' from origin 'https://beamish-rolypoly-74f5ed.netlify.app' has been blocked by CORS policy
```

## Solution implémentée

### 1. Netlify Function comme proxy

Nous avons créé une fonction Netlify (`netlify/functions/hubspot.js`) qui :
- Reçoit les requêtes du frontend
- Ajoute l'en-tête d'autorisation avec la clé API HubSpot
- Transmet la requête à l'API HubSpot
- Renvoie la réponse au frontend

### 2. Configuration des redirections Netlify

Dans `netlify.toml`, nous avons configuré :
- Une redirection de `/hubspot-api/*` vers notre fonction Netlify
- Une condition pour éviter que la redirection par défaut n'interfère avec notre proxy

### 3. Patches JavaScript côté client

Un script (`errorPatches.js`) est chargé au démarrage pour :
- Intercepter et rediriger automatiquement les requêtes directes à l'API HubSpot
- Corriger les erreurs JavaScript courantes

## Avantages de cette approche

1. **Sécurité** : La clé API HubSpot reste côté serveur et n'est jamais exposée au client
2. **Contournement CORS** : Les requêtes proviennent du même domaine du point de vue du navigateur
3. **Simplicité** : Pas besoin de serveur séparé, tout est géré par Netlify
4. **Robustesse** : Les patches JavaScript assurent que même les requêtes codées en dur sont redirigées

## Comment ça fonctionne

1. Le frontend envoie une requête à `/hubspot-api/...`
2. Netlify redirige cette requête vers la fonction `/.netlify/functions/hubspot`
3. La fonction Netlify :
   - Extrait le chemin d'API demandé
   - Ajoute l'en-tête d'autorisation avec la clé API
   - Transmet la requête à l'API HubSpot
   - Renvoie la réponse au frontend

## Mode Mock pour les tests

Un mode mock est disponible pour le développement et les tests sans dépendre de l'API HubSpot :
- Activé en définissant `VITE_USE_MOCK_CRM=true` dans le fichier `.env`
- Simule les réponses de l'API sans effectuer de requêtes réelles

## Dépannage

### Vérifier les logs Netlify

Les logs de la fonction Netlify contiennent des informations détaillées sur les requêtes et les erreurs.

### Tester en mode mock

Si vous rencontrez des problèmes, activez le mode mock pour vérifier si le problème vient de l'API HubSpot ou de votre code.

### Vérifier la clé API

Assurez-vous que la variable d'environnement `VITE_HUBSPOT_API_KEY` est correctement définie dans les paramètres de déploiement Netlify.