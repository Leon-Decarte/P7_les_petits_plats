import { RecipeRenderer } from './Templates/RecipeRenderer.js';

export class RecipeManager {
    constructor() {
        this.recipeRenderer = new RecipeRenderer('.recipe-container');
    }

    displayRecipes(recipes) {
        console.log("Displaying recipes:", recipes);
        const container = document.querySelector('.recipe-container');
        if (!recipes || recipes.length === 0) {
            container.innerHTML = '<p>No recipes found.</p>';
            console.log("No recipes found.");
        } else {
            this.recipeRenderer.renderRecipes(recipes);
            this.updateRecipeCount(recipes.length);
        }
    }

    updateRecipeCount(count) {
        console.log("Updating recipe count:", count);
        const recipeCountElement = document.getElementById('recipe-count');
        recipeCountElement.textContent = `${count} recipes`;
    }
}
