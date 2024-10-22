// FilterManager.js
export class FilterManager {
    constructor(app) {
        this.app = app;
    }

    handleSelection(type, item) {
        switch (type) {
            case 'ingredient':
                this.handleIngredientSelection(item);
                break;
            case 'appliance':
                this.handleApplianceSelection(item);
                break;
            case 'ustensil':
                this.handleUstensileSelection(item);
                break;
        }
    }

    handleIngredientSelection(ingredient) {
        if (this.app.selectedIngredients.includes(ingredient)) {
            this.app.selectedIngredients = this.app.selectedIngredients.filter(i => i !== ingredient);
        } else {
            this.app.selectedIngredients.push(ingredient);
        }
        this.updateFilterDisplay();
        this.app.applyFilters();
    }

    handleApplianceSelection(appliance) {
        if (this.app.selectedAppliances.includes(appliance)) {
            this.app.selectedAppliances = this.app.selectedAppliances.filter(a => a !== appliance);
        } else {
            this.app.selectedAppliances.push(appliance);
        }
        this.updateFilterDisplay();
        this.app.applyFilters();
    }

    handleUstensileSelection(ustensil) {
        if (this.app.selectedUstensiles.includes(ustensil)) {
            this.app.selectedUstensiles = this.app.selectedUstensiles.filter(u => u !== ustensil);
        } else {
            this.app.selectedUstensiles.push(ustensil);
        }
        this.updateFilterDisplay();
        this.app.applyFilters();
    }

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
            this.createFilters('ingredient', ingredient, ingredientFilters, selectedFiltersOutside);
        });

        this.app.selectedAppliances.forEach(appliance => {
            this.createFilters('appliance', appliance, applianceFilters, selectedFiltersOutside);
        });

        this.app.selectedUstensiles.forEach(ustensil => {
            this.createFilters('ustensil', ustensil, ustensilesFilters, selectedFiltersOutside);
        });
    }

    createFilters(type, value, dropdownContainer, outsideContainer) {
        this.createFilter(value, type, dropdownContainer);
        this.createFilter(value, type, outsideContainer);
    }

    createFilter(value, type, container) {
        const filterElement = document.createElement('div');
        filterElement.className = 'filter-badge';
        filterElement.innerHTML = `${value} <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>`;
        container.appendChild(filterElement);
        filterElement.querySelector('.remove-filter').addEventListener('click', this.removeFilter.bind(this));
    }

    removeFilter(event) {
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
    }
}