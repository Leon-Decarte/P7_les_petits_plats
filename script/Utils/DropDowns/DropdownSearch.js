// DropdownSearch.js
export class DropdownSearch {
    constructor(app) {
        this.app = app;  // The main app instance
    }

    // Sets up search functionality for each dropdown
    setupSearchInputs() {
        const ingredientSearchInput = document.getElementById('ingredients_searchInput');
        const applianceSearchInput = document.getElementById('appliance_searchInput');
        const ustensilsSearchInput = document.getElementById('ustensils_searchInput');

        ingredientSearchInput.addEventListener('input', () => {
            this.app.dropdownHandler.filterDropdown('ingredients_list_selectable', this.app.ingredients, ingredientSearchInput.value.toLowerCase());
        });

        applianceSearchInput.addEventListener('input', () => {
            this.app.dropdownHandler.filterDropdown('appliance_list_selectable', this.app.appliance, applianceSearchInput.value.toLowerCase());
        });

        ustensilsSearchInput.addEventListener('input', () => {
            this.app.dropdownHandler.filterDropdown('ustensils_list_selectable', this.app.ustensiles, ustensilsSearchInput.value.toLowerCase());
        });
    }
}
