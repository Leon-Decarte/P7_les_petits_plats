import { DataFetcher } from './Api/dataFetcher.js';
import { RecipeRenderer } from './Templates/RecipeRenderer.js';
import { MainSearch } from './Utils/MainSearch.js';
import { DropdownManager } from './Utils/DropdownManager.js';
import { FilterManager } from './Utils/FilterManager.js';
import { SearchManager } from './Utils/SearchManager.js';

export class App {
    constructor() {
        this.allRecipes = null;  
        this.filteredRecipes = null;  
        this.haveFilter = false;  
        this.ingredients = [];  
        this.appliance = [];  
        this.ustensils = [];  
        this.selectedIngredients = [];  
        this.selectedAppliances = [];  
        this.selectedUstensiles = [];  
        
        // Initialize DropdownManager and FilterManager
        this.dropdownManager = new DropdownManager(this);
        this.filterManager = new FilterManager(this);
        this.searchManager = new SearchManager(this);
        this.recipeRenderer = new RecipeRenderer('.recipe-container');
    }

    async init() {
        await this.getAllRecipes();  
        this.dropdownManager.updateIngredients(this.allRecipes);  
        this.dropdownManager.updateAppliance(this.allRecipes);  
        this.dropdownManager.updateUstensiles(this.allRecipes);  
        this.dropdownManager.populateDropdowns();  
        this.displayRecipes();
        this.searchManager.setupSearchInputs();
        this.recipeRenderer.renderRecipes(this.allRecipes);

        const recipeFilter = new MainSearch(this);  
        recipeFilter.init();  
    }

    async getAllRecipes() {
        const dataFetcher = new DataFetcher();
        try {
            this.allRecipes = await dataFetcher.fetchData();  
        } catch (error) {
            console.error('Error fetching recipes:', error);  
        }
    }



    displayRecipes() {
        const recipeRenderer = new RecipeRenderer('.recipe-container');
        const container = document.querySelector('.recipe-container');
        

        if (this.haveFilter) {
            if (!this.filteredRecipes || this.filteredRecipes.length === 0) {
                container.innerHTML = '<p>No recipes found.</p>';
            } else {
                recipeRenderer.renderRecipes(this.filteredRecipes);
                this.updateRecipeCount(this.filteredRecipes.length);
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH");
            }
        } else {
            recipeRenderer.renderRecipes(this.allRecipes);
            this.updateRecipeCount(this.allRecipes.length);
            console.log("azgdu")
        }
    }

    // Method to update the recipe count
    updateRecipeCount(recepiesSize) {
        const recipeCountElement = document.getElementById('recipe-count');
        recipeCountElement.textContent = `${recepiesSize} recettes`;
        console.log(`${recepiesSize} recettes`);
    }
}

const app = new App();
app.init();
