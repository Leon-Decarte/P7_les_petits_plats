/*
import { IngredientDropdown } from './IngredientDropdown.js';
import { ApplianceDropdown } from './ApplianceDropdown.js';
import { UstensilDropdown } from './UstensilDropdown.js';

export class DropdownHandler {
    constructor(app) {
        this.app = app; // Reference to the main App class
        this.ingredientDropdown = new IngredientDropdown(this.app);
        this.applianceDropdown = new ApplianceDropdown(this.app);
        this.ustensilDropdown = new UstensilDropdown(this.app);
    }

    // Populate all dropdowns for ingredients, appliances, and utensils
    populateAllDropdowns() {
        this.ingredientDropdown.populate();
        this.applianceDropdown.populate();
        this.ustensilDropdown.populate();
    }

    // Set up search inputs for filtering dropdown lists
    setupSearchInputs() {
        this.ingredientDropdown.setupSearch();
        this.applianceDropdown.setupSearch();
        this.ustensilDropdown.setupSearch();
    }

    // Update all dropdowns after filters are applied
    updateDropdowns(filteredRecipes) {
        this.ingredientDropdown.update(filteredRecipes);
        this.applianceDropdown.update(filteredRecipes);
        this.ustensilDropdown.update(filteredRecipes);
    }
}

*/