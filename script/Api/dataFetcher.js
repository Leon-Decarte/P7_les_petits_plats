export class DataFetcher {
    constructor() {
        this.recipesData = [];
    }

    async fetchData() {
        try {
            const response = await fetch('data/recipes.json');
            this.recipesData = await response.json();
            console.log('Recipes data fetched successfully:', this.recipesData);

            // Extract and log specific details
            this.logRecipeDetails(this.recipesData);
            return this.recipesData;
        } catch (error) {
            console.error('Error fetching the recipes:', error);
        }
        return this.recipesData;
    }

    logRecipeDetails(recipes) {
        recipes.forEach(recipe => {
            const appliances = recipe.appliance;
            const utensils = recipe.ustensils;
            const ingredients = recipe.ingredients.map(ing => ing.ingredient);

            console.log(`Recipe: ${recipe.name}`);
            console.log('Appliance:', appliances);
            console.log('Utensils:', utensils);
            console.log('Ingredients:', ingredients);
        });
    }
}