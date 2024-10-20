// DropdownHandler.js
export class DropdownHandler {
    constructor(app) {
        this.app = app;  // The main app instance
    }

    // Populates all dropdowns (ingredients, appliances, utensils)
    populateDropdowns() {
        this.populateDropdown('ingredients_list_selectable', this.app.ingredients, this.app.handleIngredientSelection.bind(this.app));
        this.populateDropdown('appliance_list_selectable', this.app.appliance, this.app.handleApplianceSelection.bind(this.app));
        this.populateDropdown('ustensils_list_selectable', this.app.ustensiles, this.app.handleUstensileSelection.bind(this.app));
    }

    // Populates a specific dropdown list with items and attaches a click handler
    populateDropdown(dropdownId, items, clickHandler) {
        const list = document.getElementById(dropdownId);
        list.innerHTML = '';

        items.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);

            li.addEventListener('click', () => {
                clickHandler(item);
            });
        });
    }

    // Filters a dropdown list based on the search input
    filterDropdown(listId, items, query) {
        const list = document.getElementById(listId);
        list.innerHTML = ''; 

        const filteredItems = items.filter(item => item.toLowerCase().includes(query));
        filteredItems.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);

            li.addEventListener('click', () => {
                if (listId === 'ingredients_list_selectable') {
                    this.app.handleIngredientSelection(item);
                } else if (listId === 'appliance_list_selectable') {
                    this.app.handleApplianceSelection(item);
                } else if (listId === 'ustensils_list_selectable') {
                    this.app.handleUstensileSelection(item);
                }
            });
        });
    }
}
