// SelectionHandler.js
export class SelectionHandler {
    constructor(app) {
        this.app = app;  // The main app instance
    }

    // Handles ingredient selection
    handleIngredientSelection(ingredient) {
        if (this.app.selectedIngredients.includes(ingredient)) {
            this.app.selectedIngredients = this.app.selectedIngredients.filter(i => i !== ingredient);
        } else {
            this.app.selectedIngredients.push(ingredient);
        }
        this.app.updateFilterDisplay();
        this.app.applyFilters();
        this.app.ingredients = this.app.ingredients.filter(i => i !== ingredient);
        this.app.dropdownHandler.populateDropdowns();
    }

    // Handles appliance selection
    handleApplianceSelection(appliance) {
        if (this.app.selectedAppliances.includes(appliance)) {
            this.app.selectedAppliances = this.app.selectedAppliances.filter(a => a !== appliance);
        } else {
            this.app.selectedAppliances.push(appliance);
        }
        this.app.updateFilterDisplay();
        this.app.applyFilters();
        this.app.appliance = this.app.appliance.filter(i => i !== appliance);
        this.app.dropdownHandler.populateDropdowns();
    }

    // Handles utensil selection
    handleUstensileSelection(ustensil) {
        if (this.app.selectedUstensiles.includes(ustensil)) {
            this.app.selectedUstensiles = this.app.selectedUstensiles.filter(u => u !== ustensil);
        } else {
            this.app.selectedUstensiles.push(ustensil);
        }
        this.app.updateFilterDisplay();
        this.app.applyFilters();
        this.app.ustensiles = this.app.ustensiles.filter(i => i !== ustensil);
        this.app.dropdownHandler.populateDropdowns();
    }
}
