import { DataFetcher } from './Api/dataFetcher.js';
import { RecipeRenderer } from './Templates/RecipeRenderer.js';
import { MainSearch } from './Utils/MainSearch.js';
import { CreateCombo } from './Templates/CreateCombo.js';


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

        this.createAllCombos();
    }

    async getAllRecipes() {
        const dataFetcher = new DataFetcher();
        this.allRecipes = await dataFetcher.fetchData();
    }

    createAllCombos() {
            new CreateCombo('ingredient', this);
            new CreateCombo('appliance', this);
            new CreateCombo('ustensils', this);


            // new CreateCombo('appliance_dropdown_container', this);
            // new CreateCombo('utensils_dropdown_container', this);

            // new CreateCombo('ingredients_dropdown_container', this);
            //  new CreateCombo('appliance_dropdown_container', this);
            // new CreateCombo('utensils_dropdown_container', this);
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
