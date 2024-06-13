import { DataFetcher } from './dataFetcher.js';
import { RecipeRenderer } from './recipeRenderer.js';

async function init() {
    const dataFetcher = new DataFetcher();
    const recipesData = await dataFetcher.fetchData();
    
    const recipeRenderer = new RecipeRenderer('.recipe-container');
    recipeRenderer.renderRecipes(recipesData);
}

// Event listener to initialize the app when the DOM content is loaded
document.addEventListener('DOMContentLoaded', init);
