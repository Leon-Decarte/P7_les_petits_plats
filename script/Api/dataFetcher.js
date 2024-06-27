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
}
