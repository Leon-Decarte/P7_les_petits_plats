export class RecipeFilter {
    constructor(app) {
        this.app = app;
    }

    init() {
        const searchBar = document.getElementById('searchbar');
        if (!searchBar) {
            console.error('Search bar element was not found.');
            return;
        }

        searchBar.addEventListener('keyup', (e) => {
            const searchText = this.checkSearchText(e);
            if (!searchText) return;
            this.filterRecipes(searchText);
        });
    }

    checkSearchText(e) {
        const searchText = e.target.value.toLowerCase().trim();
        if (searchText.length < 3) {
            this.app.haveFilter = false;
            this.app.displayRecipes();
            return false;
        }
        this.app.haveFilter = true;
        return searchText;
    }

    filterRecipes(searchText) {
        this.app.filteredRecipes = this.app.allRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchText) ||
            recipe.description.toLowerCase().includes(searchText)
        );
        this.app.displayRecipes();
    }
}
