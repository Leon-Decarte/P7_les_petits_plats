// put a comment on evry functionality and how it works and what it does and how do they interact with the other classes

export class DataFetcher {
    constructor() {
        this.recipesData = []; // initialize the recipesData array
    }

    async fetchData() { 
        try {
            // fetch the data from the recipes.json file
            const response = await fetch('data/recipes.json');
            // convert the response to a json object
            this.recipesData = await response.json();
            // log the recipes data
            console.log('Recipes data fetched successfully:', this.recipesData);
        
        } catch (error) {
            console.error('Error fetching the recipes:', error);
        }
        return this.recipesData;
    }
    
    extractIngredients(recipes) { 
        const ingredientsSet = new Set();
        recipes.forEach(recipe => {
            if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
                recipe.ingredients.forEach(ing => {
                    if (ing.ingredient) {
                        ingredientsSet.add(ing.ingredient.toLowerCase());
                    } else {
                        console.error('Ingredient data missing in:', ing);
                    }
                });
            } else {
                console.error('Ingredients field missing or not an array in recipe:', recipe);
            }
        });
        console.log('Ingredients Set:', Array.from(ingredientsSet));
        return Array.from(ingredientsSet);
    }
    
    extractAppliances(recipes) {
        const applianceSet = new Set();
        recipes.forEach(recipe => {
            // Check if the appliance field exists and is a string
            if (recipe.appliance && typeof recipe.appliance === 'string') {
                // Convert the appliance to lowercase and add to the set
                applianceSet.add(recipe.appliance.toLowerCase());
            } else {
                // Log an error if the appliance field is missing or not a string
                console.error('Appliance data missing or invalid in recipe:', recipe);
            }
        });
        // Log the appliance set to see what has been added
        console.log('Appliances Set:', Array.from(applianceSet));
        return Array.from(applianceSet);
    }
    
    extractUstensils(recipes) {
        const ustensilsSet = new Set();
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ust => ustensilsSet.add(ust.toLowerCase()));
        });
        console.log('Ustensils Set:', Array.from(ustensilsSet));
        return Array.from(ustensilsSet);
    }
}
