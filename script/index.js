let recipesData = [];

// Function to fetch data
async function fetchData() {
    try {
        const response = await fetch('data/recipes.json');
        recipesData = await response.json();
        console.log('Recipes data fetched successfully:', recipesData);
    } catch (error) {
        console.error('Error fetching the recipes:', error);
    }
}

// Function to render the DOM
function renderRecipes(data) {
    const container = document.querySelector('.recipe-container');
    if (!container) {
        console.error('The container element was not found.');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    data.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'card';  // Add class to the recipe container

        recipeElement.innerHTML = `
            <img src="./assets/photos/${recipe.image}">
            <h2 class="recipe-title">${recipe.name}</h2>
            <p class="recipe-servings">Servings: ${recipe.servings}</p>
            <p class="recipe-time">Time: ${recipe.time} minutes</p>
            <ul class="recipe-ingredients">
                ${recipe.ingredients.map(ingredient => `<li class="ingredient">${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.ingredient}</li>`).join('')}
            </ul>
            <p class="recipe-description">${recipe.description}</p>
        `;
        container.appendChild(recipeElement);
    });
}

// Function to initialize the app
async function init() {
    await fetchData();
    renderRecipes(recipesData);
}

// Event listener to initialize the app when the DOM content is loaded
document.addEventListener('DOMContentLoaded', init);
