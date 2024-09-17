import { DataFetcher } from './Api/dataFetcher.js';
import { RecipeRenderer } from './Templates/RecipeRenderer.js';
import { MainSearch } from './Utils/MainSearch.js';
import { DropdownManager } from './Templates/DropdownManager.js'; // Import the DropdownManager

export class App {
    constructor() {
        this.allRecipes = null;
        this.filteredRecipes = null;
        this.haveFilter = false;
        this.dataFetcher = new DataFetcher(); // Initialize DataFetcher
    }

    async init() {
        await this.getAllRecipes(); // Fetch all recipes first
        this.displayRecipes();

        const recipeFilter = new MainSearch(this);
        recipeFilter.init();

        const dropdownManager = new DropdownManager(this); // Pass the app instance to DropdownManager
        dropdownManager.initDropdowns(); // Initialize the dropdowns
    }

    async getAllRecipes() {
        this.allRecipes = await this.dataFetcher.fetchData(); // Fetch recipes and store in allRecipes
    }

    displayRecipes() {
        const recipeRenderer = new RecipeRenderer('.recipe-container');

        if (this.haveFilter) {
            if (!this.filteredRecipes || this.filteredRecipes.length === 0) {
                this.container.innerHTML = '<p>No recipes found.</p>';
            } else {
                recipeRenderer.renderRecipes(this.filteredRecipes);
            }
        } else {
            recipeRenderer.renderRecipes(this.allRecipes);
        }
    }
}

const app = new App();
app.init();
