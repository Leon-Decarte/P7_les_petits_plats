export class DropdownSearchManager {
    constructor(app) {
        this.app = app;
    }

    // Sets up search inputs for filtering dropdowns
    setupSearchInputs() {
        const ingredientSearchInput = document.getElementById('ingredients_searchInput');
        const applianceSearchInput = document.getElementById('appliance_searchInput');
        const ustensilsSearchInput = document.getElementById('ustensils_searchInput');

        ingredientSearchInput.addEventListener('input', () => {
            this.filterDropdown('ingredients_list_selectable', this.app.ingredients, ingredientSearchInput.value.toLowerCase());
        });

        applianceSearchInput.addEventListener('input', () => {
            this.filterDropdown('appliance_list_selectable', this.app.appliance, applianceSearchInput.value.toLowerCase());
        });

        ustensilsSearchInput.addEventListener('input', () => {
            this.filterDropdown('ustensils_list_selectable', this.app.ustensiles, ustensilsSearchInput.value.toLowerCase());
        });
    }

    // Filters dropdown based on search input
    filterDropdown(listId, items, query) {
        const list = document.getElementById(listId);
        list.innerHTML = '';  // Clear the existing list

        const filteredItems = items.filter(item => item.toLowerCase().includes(query));
        filteredItems.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);

            // Attach click handler for each filtered item
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
