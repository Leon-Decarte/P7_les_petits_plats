export class DropdownSelectionManager {
    constructor(app) {
        this.app = app;
    }

    handleIngredientSelection(ingredient) {
        this.toggleSelection(this.app.selectedIngredients, ingredient);
        this.app.updateFilterDisplay();
        this.app.applyFilters();
        this.app.ingredients = this.app.ingredients.filter(i => i !== ingredient);
        this.app.dropdownHandler.populateDropdowns();
    }

    handleApplianceSelection(appliance) {
        this.toggleSelection(this.app.selectedAppliances, appliance);
        this.app.updateFilterDisplay();
        this.app.applyFilters();
        this.app.appliance = this.app.appliance.filter(a => a !== appliance);
        this.app.dropdownHandler.populateDropdowns();
    }

    handleUstensileSelection(ustensil) {
        this.toggleSelection(this.app.selectedUstensiles, ustensil);
        this.app.updateFilterDisplay();
        this.app.applyFilters();
        this.app.ustensiles = this.app.ustensiles.filter(u => u !== ustensil);
        this.app.dropdownHandler.populateDropdowns();
    }

     // Updates the display of the currently selected filters
    updateFilterDisplay() {
        const ingredientFilters = document.getElementById('ingredient-filters');
        const applianceFilters = document.getElementById('appliance-filters');
        const ustensilesFilters = document.getElementById('ustensiles-filters');
        
        // New container outside the dropdown
        const selectedFiltersOutside = document.getElementById('selected-filters');
    
        // Clear both the dropdown filters and the outside filter container
        ingredientFilters.innerHTML = '';
        applianceFilters.innerHTML = '';
        ustensilesFilters.innerHTML = '';
        selectedFiltersOutside.innerHTML = ''; // Clear the outside container
    
        // Add selected ingredients to both the dropdown and the outside div
        this.selectedIngredients.forEach(ingredient => {
            this.createFilterElement('ingredient', ingredient, ingredientFilters, selectedFiltersOutside);
        });
    
        // Add selected appliances to both the dropdown and the outside div
        this.selectedAppliances.forEach(appliance => {
            this.createFilterElement('appliance', appliance, applianceFilters, selectedFiltersOutside);
        });
    
        // Add selected utensils to both the dropdown and the outside div
        this.selectedUstensiles.forEach(ustensil => {
            this.createFilterElement('ustensil', ustensil, ustensilesFilters, selectedFiltersOutside);
        });
    
        // Update recipe count if necessary
        this.updateRecipeCount();
    }
    
    
        createFilterElement(type, value, dropdownContainer, outsideContainer) {
        // Create the filter element for the dropdown
        const filterElementDropdown = document.createElement('div');
        filterElementDropdown.className = 'filter-badge';
        filterElementDropdown.innerHTML = `
            ${value}
            <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>
        `;
        dropdownContainer.appendChild(filterElementDropdown);  // Append to dropdown container
    
        // Create the filter element for the outside container
        const filterElementOutside = document.createElement('div');
        filterElementOutside.className = 'filter-badge';
        filterElementOutside.innerHTML = `
            ${value}
            <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>
        `;
        outsideContainer.appendChild(filterElementOutside);  // Append to outside container
    
        // Add event listener to remove the filter for both containers
        const removeFilter = (event) => {
            const type = event.target.getAttribute('data-type');
            const value = event.target.getAttribute('data-value');
    
            if (type === 'ingredient') {
                this.selectedIngredients = this.selectedIngredients.filter(i => i !== value);
            } else if (type === 'appliance') {
                this.selectedAppliances = this.selectedAppliances.filter(a => a !== value);
            } else if (type === 'ustensil') {
                this.selectedUstensiles = this.selectedUstensiles.filter(u => u !== value);
            }
    
            // Update the filter display and apply the filters after removing
            this.updateFilterDisplay();
            this.applyFilters();
        };
    
        // Attach remove listener for both dropdown and outside filter elements
        filterElementDropdown.querySelector('.remove-filter').addEventListener('click', removeFilter);
        filterElementOutside.querySelector('.remove-filter').addEventListener('click', removeFilter);
    }
    
    
        // Applies the filters to the recipe list and updates the displayed recipes
        applyFilters() {
            this.filteredRecipes = this.allRecipes.filter(recipe => {
                const matchesIngredients = this.selectedIngredients.length === 0 ||
                    this.selectedIngredients.every(ingredient =>
                        recipe.ingredients.some(i => i.ingredient.toLowerCase() === ingredient.toLowerCase())
                    );
    
                const matchesAppliances = this.selectedAppliances.length === 0 ||
                    this.selectedAppliances.includes(recipe.appliance);
    
                const matchesUstensiles = this.selectedUstensiles.length === 0 ||
                    this.selectedUstensiles.every(ustensil =>
                        recipe.ustensils.some(u => u.toLowerCase() === ustensil.toLowerCase())
                    );
    
                return matchesIngredients && matchesAppliances && matchesUstensiles;
            });
    
            this.haveFilter = this.selectedIngredients.length > 0 || this.selectedAppliances.length > 0 || this.selectedUstensiles.length > 0;
            this.getIngredients(this.filteredRecipes)//Update dropdown list for ingredients
            this.getAppliance(this.filteredRecipes)//Update dropdown list for appliance
            this.getUstensiles(this.filteredRecipes)//Update dropdown list for utensils
            this.displayRecipes();
        }


}
