// put a comment on evry functionality and how it works and what it does and how do they interact with the other classes

export class DataFetcher {
    constructor() {
        this.recipesData = []; // initialize the recipesData array
    }

    async fetchData() { 
        try {
            const response = await fetch('data/recipes.json');
            this.recipesData = await response.json();
            console.log('dataFectech > fetchData :  Recipes data fetched successfully:', this.recipesData);
        } catch (error) {
            console.error('dataFectech > fetchData : Error fetching the recipes:', error);
        }
        return this.recipesData;
    }
    

}
