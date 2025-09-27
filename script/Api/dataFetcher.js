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
    

}
