// put a comment on evry functionality and how it works and what it does

export class MainSearch {
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
            const searchText = e.target.value.toLowerCase().trim();
            this.app.mainSearchText = searchText;
            this.app.filterManager.applyFilters(); // Always apply unified filters
        });
    }

    checkSearchText(e) {
        const searchText = e.target.value.toLowerCase().trim();
        if (searchText.length < 3) {
            this.app.haveFilter = false;
            this.app.displayRecipes();
            return false;
        }
        // set the haveFilter to true
        this.app.haveFilter = true;
        // return the search text
        return searchText;
    }

    /*filterRecipesWithFunctional(searchText) {
        // Use the filter method to create a new array of recipes that match the search text.
        this.app.filteredRecipes = this.app.allRecipes.filter(recipe =>
            // Check if the recipe name or description includes the search text.
            recipe.name.toLowerCase().includes(searchText) ||
            recipe.description.toLowerCase().includes(searchText) ||
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchText.toLowerCase()))

        );
        
        this.app.displayRecipes(); // Display the filtered recipes.
    }*/

    

    filterRecipesWithLoops(searchText) {
    const filteredRecipes = []; // Tableau qui contiendra les recettes filtrées.
    
    // Parcours de toutes les recettes
    for (let i = 0; i < this.app.allRecipes.length; i++) {
        const recipe = this.app.allRecipes[i];
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients;

        let found = false;

        // Vérifie dans le nom et la description
        if (name.includes(searchText) || description.includes(searchText)) {
            found = true;
        } else {
            // Vérifie dans les ingrédients avec une boucle native
            for (let j = 0; j < ingredients.length; j++) {
                const ing = ingredients[j].ingredient.toLowerCase();
                if (ing.includes(searchText)) {
                    found = true;
                    break; // on peut s'arrêter dès qu'on trouve un match
                }
            }
        }

        if (found) {
            filteredRecipes.push(recipe);
        }
    }

    this.app.filteredRecipes = filteredRecipes;
    this.app.displayRecipes();
}

}

