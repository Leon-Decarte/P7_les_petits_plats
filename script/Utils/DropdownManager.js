export class DropdownManager {
    constructor(app) {
        this.app = app;
    }

    updateAppliance(recipes) {
        console.log('Updating appliances dropdown with recipes:', recipes);  // Log recipes
        let appliances = recipes.map(recipe => recipe.appliance.toLowerCase());
        this.app.appliance = [...new Set(appliances)];
        if (this.app.selectedAppliances.length) {
            this.app.appliance = this.app.appliance.filter(item => !this.app.selectedAppliances.includes(item));
        }
        console.log('Appliance data for dropdown:', this.app.appliance);  // Log appliance data
        this.populateDropdowns();
    }

    updateUstensiles(recipes) {
        console.log('Updating ustensils dropdown with recipes:', recipes);  // Log recipes
        let ustensiles = [];
        recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => ustensiles.push(ustensil.toLowerCase())));
        this.app.ustensils = [...new Set(ustensiles)];
        if (this.app.selectedUstensiles.length) {
            this.app.ustensils = this.app.ustensils.filter(item => !this.app.selectedUstensiles.includes(item));
        }
        console.log('Ustensils data for dropdown:', this.app.ustensils);  // Log ustensils data
        this.populateDropdowns();
    }

    updateIngredients(recipes) {
        console.log('Updating ingredients dropdown with recipes:', recipes);  // Log recipes
        let ingredients = [];
        recipes.forEach(recipe => recipe.ingredients.forEach(ingredient => ingredients.push(ingredient.ingredient.toLowerCase())));
        this.app.ingredients = [...new Set(ingredients)];
        if (this.app.selectedIngredients.length) {
            this.app.ingredients = this.app.ingredients.filter(item => !this.app.selectedIngredients.includes(item));
        }
        console.log('Ingredients data for dropdown:', this.app.ingredients);  // Log ingredients data
        this.populateDropdowns();
    }

    populateDropdowns() {
        console.log('Populating dropdowns...');  // Log when dropdown population starts
        this.populateDropdown('ingredients_list_selectable', this.app.ingredients, 'ingredient');
        this.populateDropdown('appliance_list_selectable', this.app.appliance, 'appliance');
        this.populateDropdown('ustensils_list_selectable', this.app.ustensils, 'ustensil');
    }

    populateDropdown(dropdownId, items, type) {
        console.log(`Populating ${dropdownId} with items:`, items);  // Log which dropdown is being populated
        const list = document.getElementById(dropdownId);
        list.innerHTML = '';
        items.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);
            li.addEventListener('click', () => this.app.handleSelection(type, item));
        });
    }
}
