export function getIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        id: String(i),
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }

  return ingredients;
}

export function getInstructionSteps(text) {
  if (!text) {
    return [];
  }

  return text
    .split(/\r?\n/)
    .map(step => step.trim())
    .filter(step => step.length > 0);
}
