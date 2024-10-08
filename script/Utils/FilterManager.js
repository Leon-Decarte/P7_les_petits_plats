// FilterManager.js

/*
export class FilterManager {
    constructor(app) {
        this.app = app;
    }

    updateFilterDisplay() {
        const filterContainer = document.getElementById('selected-filters');
        filterContainer.innerHTML = '';

        this.app.selectedIngredients.forEach(ingredient => {
            this.createFilterElement('ingredient', ingredient, filterContainer);
        });

        this.app.selectedAppliances.forEach(appliance => {
            this.createFilterElement('appliance', appliance, filterContainer);
        });

        this.app.selectedUstensiles.forEach(ustensil => {
            this.createFilterElement('ustensil', ustensil, filterContainer);
        });

        this.updateRecipeCount();
    }

    createFilterElement(type, value, container) {
        const filterElement = document.createElement('div');
        filterElement.className = 'filter-badge';
        filterElement.innerHTML = `
            ${value}
            <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>
        `;
        container.appendChild(filterElement);

        // Add event listener for removing filter
        filterElement.querySelector('.remove-filter').addEventListener('click', (event) => {
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
        });
    }

    applyFilters() {
        this.app.filteredRecipes = this.app.allRecipes.filter(recipe => {
            const matchesIngredients = this.app.selectedIngredients.length === 0 ||
                this.app.selectedIngredients.every(ingredient =>
                    recipe.ingredients.some(i => i.ingredient.toLowerCase() === ingredient.toLowerCase())
                );

            const matchesAppliances = this.app.selectedAppliances.length === 0 ||
                this.app.selectedAppliances.includes(recipe.appliance);

            const matchesUstensiles = this.app.selectedUstensiles.length === 0 ||
                this.app.selectedUstensiles.every(ustensil =>
                    recipe.ustensils.some(u => u.toLowerCase() === ustensil.toLowerCase())
                );

            return matchesIngredients && matchesAppliances && matchesUstensiles;
        });

        this.app.haveFilter = this.app.selectedIngredients.length > 0 || this.app.selectedAppliances.length > 0 || this.app.selectedUstensiles.length > 0;
        this.app.displayRecipes();
    }

    updateRecipeCount() {
        const recipeCountElement = document.getElementById('recipe-count');
        if (this.app.filteredRecipes && recipeCountElement) {
            recipeCountElement.textContent = `${this.app.filteredRecipes.length} recettes`;
        } else {
            console.warn('No recipes available or recipe count element not found.');
        }
    }
}
*/