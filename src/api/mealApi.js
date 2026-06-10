const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données.');
  }

  return response.json();
}

export async function getCategories() {
  const data = await getJson(`${BASE_URL}/categories.php`);
  return data.categories || [];
}

export async function getMealsByCategory(category) {
  const data = await getJson(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  );
  return data.meals || [];
}

export async function searchMealsByName(name) {
  const data = await getJson(
    `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`
  );
  return data.meals || [];
}

export async function getMealDetails(id) {
  const data = await getJson(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals ? data.meals[0] : null;
}
