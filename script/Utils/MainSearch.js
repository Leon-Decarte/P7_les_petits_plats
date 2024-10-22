// put a comment on evry functionality and how it works and what it does

export class MainSearch {
    constructor(app) {
        this.app = app;
    }

    init() {
        // get the search bar element
        const searchBar = document.getElementById('searchbar'); 
        // if the search bar element is not found, return
        if (!searchBar) {
            console.error('Search bar element was not found.');
            return;
        }
        // add an event listener to the search bar element
        searchBar.addEventListener('keyup', (e) => {
            // get the search text
            const searchText = this.checkSearchText(e);
            // if the search text is not found, return
            if (!searchText) return;
            // filter the recipes
            /* this.filterRecipesWithLoops(searchText); */
            this.filterRecipesWithFunctional(searchText);
        });
    }

    checkSearchText(e) {
        // get the search text
        const searchText = e.target.value.toLowerCase().trim();
        // if the search text is less than 3 characters, return
        if (searchText.length < 3) {
            // set the haveFilter to false
            this.app.haveFilter = false;
            // display the recipes
            this.app.displayRecipes();
            // return false
            return false;
        }
        // set the haveFilter to true
        this.app.haveFilter = true;
        // return the search text
        return searchText;
    }

    filterRecipesWithFunctional(searchText) {
        // Use the filter method to create a new array of recipes that match the search text.
        this.app.filteredRecipes = this.app.allRecipes.filter(recipe =>
            // Check if the recipe name or description includes the search text.
            recipe.name.toLowerCase().includes(searchText) ||
            recipe.description.toLowerCase().includes(searchText)
        );
        
        this.app.displayRecipes(); // Display the filtered recipes.
    }

    

/*   filterRecipesWithLoops(searchText) {
        const filteredRecipes = []; // Create an empty array to store filtered recipes.
        
        // Loop through all recipes using a for loop.
        for (let i = 0; i < this.app.allRecipes.length; i++) {
            const recipe = this.app.allRecipes[i]; // Get the current recipe.
            
            // Check if the recipe name or description includes the search text.
            if (
                recipe.name.toLowerCase().includes(searchText) ||
                recipe.description.toLowerCase().includes(searchText)
            ) {
                filteredRecipes.push(recipe); // If it matches, add to the filteredRecipes array.
            }
        }
    
        this.app.filteredRecipes = filteredRecipes; // Update the filteredRecipes in the App.
        this.app.displayRecipes(); // Display the filtered recipes.
    } */
    
}

