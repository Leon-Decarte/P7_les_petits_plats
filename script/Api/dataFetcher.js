export class DataFetcher {
    constructor() {
        this.recipesData = [];
    }

    async fetchData() {
        try {
            const response = await fetch('data/recipes.json');
            this.recipesData = await response.json();
            console.log('Recipes data fetched successfully:', this.recipesData);
        
        } catch (error) {
            console.error('Error fetching the recipes:', error);
        }
        return this.recipesData;
    }
    
    extractIngredients(recipes) {
        const ingredientsSet = new Set();
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ing => ingredientsSet.add(ing.ingredient.toLowerCase()));
            console.log(ingredientsSet);
        });
        return Array.from(ingredientsSet);
    }
    
    extractAppliance(recipes) {
        const applianceSet = new Set();
        recipes.forEach(recipe => {
            recipe.appliance.forEach(appliance => applianceSet.add(appliance.toLowerCase()));
        });
        return Array.from(applianceSet);
    }
    
    extractUstensils(recipes) {
        const ustensilsSet = new Set();
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ust => ustensilsSet.add(ust.toLowerCase()));
        });
        return Array.from(ustensilsSet);
    }
}
