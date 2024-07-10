export class DropdownManager {
    constructor(data) {
        this.data = data;
    }

    populateDropdowns() {
        const { appliances, utensils, ingredients } = this.data;

        const appliancesDropdown = document.getElementById('appliancesDropdown');
        const utensilsDropdown = document.getElementById('utensilsDropdown');
        const ingredientsDropdown = document.getElementById('ingredientsDropdown');

        this.populateDropdown(appliancesDropdown, appliances);
        this.populateDropdown(utensilsDropdown, utensils);
        this.populateDropdown(ingredientsDropdown, ingredients);
    }

    populateDropdown(dropdown, items) {
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            dropdown.appendChild(option);
        });
    }
}