// FilterDisplay.js
export class FilterDisplay {
    constructor(app) {
        this.app = app;  // The main app instance
    }

    // Updates the display of the currently selected filters
    updateFilterDisplay() {
        const ingredientFilters = document.getElementById('ingredient-filters');
        const applianceFilters = document.getElementById('appliance-filters');
        const ustensilesFilters = document.getElementById('ustensiles-filters');
        const selectedFiltersOutside = document.getElementById('selected-filters');

        ingredientFilters.innerHTML = '';
        applianceFilters.innerHTML = '';
        ustensilesFilters.innerHTML = '';
        selectedFiltersOutside.innerHTML = '';

        this.app.selectedIngredients.forEach(ingredient => {
            this.createFilterElement('ingredient', ingredient, ingredientFilters, selectedFiltersOutside);
        });

        this.app.selectedAppliances.forEach(appliance => {
            this.createFilterElement('appliance', appliance, applianceFilters, selectedFiltersOutside);
        });

        this.app.selectedUstensiles.forEach(ustensil => {
            this.createFilterElement('ustensil', ustensil, ustensilesFilters, selectedFiltersOutside);
        });

        this.app.updateRecipeCount();
    }

    // Creates the filter badge for both dropdown and outside container
    createFilterElement(type, value, dropdownContainer, outsideContainer) {
        const filterElementDropdown = document.createElement('div');
        filterElementDropdown.className = 'filter-badge';
        filterElementDropdown.innerHTML = `${value} <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>`;
        dropdownContainer.appendChild(filterElementDropdown);

        const filterElementOutside = document.createElement('div');
        filterElementOutside.className = 'filter-badge';
        filterElementOutside.innerHTML = `${value} <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>`;
        outsideContainer.appendChild(filterElementOutside);

        const removeFilter = (event) => {
            const type = event.target.getAttribute('data-type');
            const value = event.target.getAttribute('data-value');
            if (type === 'ingredient') {
                this.app.selectedIngredients = this.app.selectedIngredients.filter(i => i !== value);
            } else if (type === 'appliance') {
                this.app.selectedAppliances = this.app.selectedAppliances.filter(a => a !== value);
            } else if (type === 'ustensil') {
                this.app.selectedUstensiles = this.app.selectedUstensiles.filter(u => u !== value);
            }
            this.updateFilterDisplay();
            this.app.applyFilters();
        };

        filterElementDropdown.querySelector('.remove-filter').addEventListener('click', removeFilter);
        filterElementOutside.querySelector('.remove-filter').addEventListener('click', removeFilter);
    }
}
