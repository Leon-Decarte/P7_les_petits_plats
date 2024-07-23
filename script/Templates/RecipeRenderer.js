export class RecipeRenderer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error('The container element was not found.');
        }
    }

    renderRecipes(data) {
        if (!this.container) {
            return;
        }

        // Clear existing content
        this.container.innerHTML = '';

        data.forEach(recipe => {    
            const recipeElement = document.createElement('div');
            recipeElement.className = 'card';  // Add class to the recipe container

            recipeElement.innerHTML = `
                <img src="./assets/photos/${recipe.image}">
                <div class="card__information">
                    <h2 class="recipe-title">${recipe.name}</h2>
                    <p class="recipe-description-title">Recette</p>
                    <p class="recipe-description">${recipe.description}</p>
                    <p class="recipe-description-ingredients">Ingrédients</p>
                    <ul class="recipe-ingredients">
                        ${recipe.ingredients.map(ingredient => `<li class="ingredient">${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.ingredient}</li>`).join('')}
                    </ul>
                
                
                </div>
            `;
            this.container.appendChild(recipeElement);
        });
    }
}
