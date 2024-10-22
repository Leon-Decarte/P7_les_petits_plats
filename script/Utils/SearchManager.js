// SearchManager.js
export class SearchManager {
    constructor(app) {
        this.app = app;
    }

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
            this.filterDropdown('ustensils_list_selectable', this.app.ustensils, ustensilsSearchInput.value.toLowerCase());
        });
    }

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
                    this.app.filterManager.handleSelection('ingredient', item);
                } else if (listId === 'appliance_list_selectable') {
                    this.app.filterManager.handleSelection('appliance', item);
                } else if (listId === 'ustensils_list_selectable') {
                    this.app.filterManager.handleSelection('ustensil', item);
                }
            });
        });
    }
}