# MealDB Recipes - Mini application React Native

Mini application mobile réalisée avec React Native + Expo. Elle consomme l'API TheMealDB pour afficher des catégories, filtrer les plats par catégorie, chercher un plat par nom et afficher les détails d'une recette.

## Fonctionnalités

- Écran d'accueil avec liste horizontale des catégories.
- Sélection d'une catégorie avec changement de style.
- Liste des plats sous forme de grille avec `FlatList`.
- Écran de recherche par nom de recette.
- Écran de détails : image, catégorie, pays, ingrédients et instructions.
- Gestion des états : chargement, erreurs, résultats vides.
- Navigation entre plusieurs écrans avec React Navigation.
- Composants réutilisables : `CategoryCard`, `MealCard`, `Loading`, `ErrorMessage`, `BackButton`, `Header`.

## APIs utilisées

- Liste des catégories : `https://www.themealdb.com/api/json/v1/1/categories.php`
- Filtrage par catégorie : `https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken`
- Recherche par nom : `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`
- Détails par id : `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`

## Installation recommandée

```bash
npx create-expo-app mealdb-react-native-app
cd mealdb-react-native-app
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

Ensuite, remplacez le fichier `App.js` et ajoutez le dossier `src` fourni dans ce projet.

## Lancer l'application

```bash
npm start
```

Puis scannez le QR code avec Expo Go ou lancez l'application dans un simulateur Android/iOS.

## Structure du projet

```txt
mealdb-react-native-app/
├── App.js
├── package.json
├── app.json
└── src/
    ├── api/
    │   └── mealApi.js
    ├── components/
    │   ├── BackButton.js
    │   ├── CategoryCard.js
    │   ├── ErrorMessage.js
    │   ├── Header.js
    │   ├── Loading.js
    │   └── MealCard.js
    ├── screens/
    │   ├── DetailsScreen.js
    │   ├── HomeScreen.js
    │   ├── MealsScreen.js
    │   └── SearchScreen.js
    └── utils/
        └── mealUtils.js
```

## Scénario conseillé pour la vidéo de démonstration

1. Lancer l'application avec `npm start`.
2. Montrer le chargement initial.
3. Montrer les catégories et sélectionner `Beef`, puis `Chicken`.
4. Cliquer sur un plat pour ouvrir l'écran de détails.
5. Faire défiler les ingrédients et les instructions.
6. Revenir à l'accueil avec `Go back`.
7. Ouvrir l'écran `Recherche`, chercher `Arrabiata` ou `Chicken`, puis ouvrir un résultat.

## Publication GitHub

```bash
git init
git add .
git commit -m "Initial commit - MealDB React Native app"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/mealdb-react-native-app.git
git push -u origin main
```
