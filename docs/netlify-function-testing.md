# Guide de test des fonctions Netlify

Ce document explique comment vérifier que les fonctions Netlify sont correctement déployées et fonctionnelles.

## Vérification rapide

Pour vérifier rapidement si les fonctions Netlify sont déployées, visitez :

```
https://votre-site.netlify.app/.netlify/functions/test
```

Cette URL devrait retourner un JSON avec des informations sur l'état des fonctions.

## Page de test complète

Une page de test complète est disponible à l'adresse :

```
https://votre-site.netlify.app/test-functions
```

Cette page effectue plusieurs tests :

1. **Test de base** : Vérifie si les fonctions Netlify sont accessibles
2. **Test HubSpot** : Vérifie si la fonction de proxy HubSpot est correctement déployée

## Interprétation des résultats

### Test de base réussi

Si le test de base réussit, vous verrez :
- Un message de succès
- Des informations sur l'environnement (variables d'environnement)
- La liste des fonctions disponibles

### Test HubSpot réussi

Le test HubSpot peut avoir plusieurs résultats :

1. **Succès complet** : La fonction est déployée et l'API HubSpot répond correctement
2. **Succès partiel (401)** : La fonction est déployée mais l'API HubSpot renvoie une erreur d'authentification
   - Cela peut indiquer que la clé API est invalide ou mal configurée
3. **Échec** : La fonction n'est pas accessible ou une autre erreur s'est produite

## Résolution des problèmes

### Fonction non déployée

Si la fonction n'est pas déployée :

1. Vérifiez que le fichier `netlify/functions/hubspot.js` existe dans votre dépôt
2. Vérifiez les logs de déploiement Netlify pour des erreurs
3. Assurez-vous que la configuration dans `netlify.toml` est correcte

### Erreur d'authentification (401)

Si vous obtenez une erreur 401 :

1. Vérifiez que la variable d'environnement `VITE_HUBSPOT_API_KEY` est correctement définie dans les paramètres Netlify
2. Vérifiez que la clé API est valide et a les permissions nécessaires
3. Assurez-vous que la clé API n'a pas expiré

### Autres erreurs

Pour d'autres erreurs :

1. Consultez les logs de fonction dans l'interface Netlify
2. Vérifiez la console du navigateur pour des erreurs réseau
3. Assurez-vous que les redirections dans `netlify.toml` sont correctement configurées

## Vérification manuelle via cURL

Vous pouvez également tester les fonctions avec cURL :

```bash
# Test de la fonction de test
curl https://votre-site.netlify.app/.netlify/functions/test

# Test de la fonction HubSpot
curl https://votre-site.netlify.app/.netlify/functions/hubspot/crm/v3/properties/contacts
```

Ces commandes devraient retourner des réponses JSON indiquant l'état des fonctions.