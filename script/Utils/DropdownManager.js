// DropdownManager.js
export class DropdownManager {
    constructor() {}

    // Populates all dropdowns (ingredients, appliances, utensils) with the relevant items
    populateDropdowns(ingredients, appliance, ustensils) {
        this.populateDropdown('ingredients_list_selectable', ingredients, 'ingredient');
        this.populateDropdown('appliance_list_selectable', appliance, 'appliance');
        this.populateDropdown('ustensils_list_selectable', ustensils, 'ustensil');
    }

    // Populates a specific dropdown list with items and attaches a click handler for item selection
    populateDropdown(dropdownId, items, type) {
        const list = document.getElementById(dropdownId);  // Get the dropdown list element
        list.innerHTML = '';  // Clear any existing items in the list

        items.forEach(item => {
            let li = document.createElement('li');  // Create a new list item for each item
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);

            li.addEventListener('click', () => handleSelection(type, item));
        });
    }
}
