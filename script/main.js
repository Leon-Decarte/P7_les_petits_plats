import { DataFetcher } from './Api/dataFetcher.js';
import { RecipeRenderer } from './Templates/RecipeRenderer.js';
import { MainSearch } from './Utils/MainSearch.js';

export class App {
    constructor() {
        this.allRecipes = null;
        this.filteredRecipes = null;
        this.haveFilter = false;
    }

    async init() {
        await this.getAllRecipes();
        this.displayRecipes();

        const recipeFilter = new MainSearch(this);
        recipeFilter.init();

        this.createCombo();
    }

    async getAllRecipes() {
        const dataFetcher = new DataFetcher();
        this.allRecipes = await dataFetcher.fetchData();
    }

    createCombo() {
        // class de création des combos box
        if (this.haveFilter) {
            //instance de CreateCombos avec this.filteredRecipes
        } else {
//instance de CreateCombos avec this.allRecipes
        }
    }

    displayRecipes() {
        const recipeRenderer = new RecipeRenderer('.recipe-container');

        if (this.haveFilter) {
            if (!this.filteredRecipes || this.filteredRecipes.length === 0) {
                // Display a message to the user indicating no recipes found
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
