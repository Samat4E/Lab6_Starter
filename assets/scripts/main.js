// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9.
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10.
  const main = document.querySelector('main');

  // A11.
  recipes.forEach(recipe => {
    const card = document.createElement('recipe-card');
    card.data = recipe;
    main.appendChild(card);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // B1.
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2.
  const form = document.getElementById('new-recipe');

  // B3.
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // B4.
    const formData = new FormData(form);

    // B5.
    const recipeObject = {};
    for (const [key, value] of formData.entries()) {
      recipeObject[key] = value;
    }

    // B6.
    const card = document.createElement('recipe-card');

    // B7.
    card.data = recipeObject;

    // B8.
    const main = document.querySelector('main');
    main.appendChild(card);

    // B9.
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);

    // Optional: reset the form
    form.reset();
  });

  // B10.
  const clearBtn = document.querySelector('button.danger');

  // B11.
  clearBtn.addEventListener('click', () => {
    // B12.
    localStorage.clear();

    // B13.
    const main = document.querySelector('main');
    main.innerHTML = '';
  });
}
