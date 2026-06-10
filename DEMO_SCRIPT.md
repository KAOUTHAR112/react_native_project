# Script court pour la vidéo de démonstration

Bonjour, voici ma mini application React Native réalisée avec Expo et l'API TheMealDB.

Au lancement, l'application récupère les catégories depuis l'API. On voit une liste horizontale de catégories et une grille de plats. Quand je clique sur une catégorie, l'application appelle l'API de filtrage et affiche les plats correspondants.

Ensuite, je clique sur un plat. L'application navigue vers l'écran de détails et récupère les informations complètes de la recette : image, ingrédients, mesures et instructions.

Je reviens ensuite à l'accueil et j'ouvre l'écran de recherche. Ici, je peux chercher une recette par son nom. L'application appelle l'API de recherche et affiche les résultats.

Cette application utilise plusieurs notions vues en cours : composants, props, useState, useEffect, fetch, FlatList, Pressable, TextInput, gestion d'erreur et navigation entre écrans.
