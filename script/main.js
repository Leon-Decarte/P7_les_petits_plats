import {DataFetcher} from './Api/dataFetcher.js';
import {RecipeRenderer} from './Templates/RecipeRenderer.js';
import {MainSearch} from './Utils/MainSearch.js';

export class App {
    constructor() {
        // Constructor initializes various properties for recipes, filters, and dropdown selections
        this.allRecipes = null;  // All fetched recipes objects
        this.filteredRecipes = null;  // Recipes after applying filters
        this.haveFilter = false;  // Boolean to check if filters are applied
        this.ingredients = [];  // List of deduplicated ingredients
        this.appliance = [];  // List of appliances
        this.ustensiles = [];  // List of utensils
        this.selectedIngredients = [];  // Selected ingredients for filtering
        this.selectedAppliances = [];  // Selected appliances for filtering
        this.selectedUstensiles = [];  // Selected utensils for filtering
    }

    // Initializes the app by fetching data, setting up filters, and displaying recipes
    async init() {
        await this.getAllRecipes();  // Wait for recipes to be fetched
        this.getIngredients(this.allRecipes);  // Extract ingredients from recipes
        this.getAppliance(this.allRecipes);  // Extract appliances from recipes
        this.getUstensiles(this.allRecipes);  // Extract utensils from recipes
        this.populateDropdowns();  // Populate dropdowns with the fetched data
        this.setupSearchInputs();  // Set up the search functionality for dropdowns
        this.displayRecipes();  // Display all recipes initially

        const recipeFilter = new MainSearch(this);  // Create a MainSearch instance to handle searching
        recipeFilter.init();  // Initialize search functionalities

    }

    // Fetches all recipes from the data source
    async getAllRecipes() {
        const dataFetcher = new DataFetcher();
        try {
            this.allRecipes = await dataFetcher.fetchData();  // Fetch all recipes asynchronously
        } catch (error) {
            console.error('Error fetching recipes:', error);  // Handle fetch errors
        }
    }

    // Extracts unique appliances from the fetched recipes
    getAppliance(recepies) {
        let appliance = [];
        recepies.forEach(r => {
            appliance.push(r.appliance);  // Collect appliances from each recipe
        });
        this.appliance = [...new Set(appliance)];  // Remove duplicates by creating a Set
        this.populateDropdowns();  // Update dropdowns with the extracted appliances
        console.log("Appliance", this.appliance);
    }

    // Extracts unique utensils from the fetched recipes
    getUstensiles(recepies) {
        let ustensiles = [];
        recepies.forEach(r => {
            r.ustensils.forEach(u => {
                ustensiles.push(u);  // Collect utensils from each recipe
            });
        });
        this.ustensiles = [...new Set(ustensiles)];  // Remove duplicates by creating a Set
        this.populateDropdowns();  // Update dropdowns with the extracted utensils
        console.log("Ustensiles", this.ustensiles);
    }

    // Extracts unique ingredients from the fetched recipes
    getIngredients(recepies) {
        let ingredients = [];
        recepies.forEach(r => {
            r.ingredients.forEach(i => {
                ingredients.push(i.ingredient.toLowerCase());  // Collect ingredients from each recipe and convert to lowercase
            });
        });
        this.ingredients = [...new Set(ingredients)];  // Remove duplicates by creating a Set
        this.populateDropdowns();  // Update dropdowns with the extracted ingredients
        console.log("ingredients", this.ingredients);
    }

    // Populates all dropdowns (ingredients, appliances, utensils) with the relevant items
    populateDropdowns() {
        this.populateDropdown('ingredients_list_selectable', this.ingredients, this.handleIngredientSelection.bind(this));  // Populate ingredients dropdown
        this.populateDropdown('appliance_list_selectable', this.appliance, this.handleApplianceSelection.bind(this));  // Populate appliances dropdown
        this.populateDropdown('ustensils_list_selectable', this.ustensiles, this.handleUstensileSelection.bind(this));  // Populate utensils dropdown
    }

    // Populates a specific dropdown list with items and attaches a click handler for item selection
    populateDropdown(dropdownId, items, clickHandler) {
        const list = document.getElementById(dropdownId);  // Get the dropdown list element
        list.innerHTML = '';  // Clear any existing items in the list

        items.forEach(item => {
            let li = document.createElement('li');  // Create a new list item for each item
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);

            li.addEventListener('click', () => {
                clickHandler(item);  // Attach the click handler to each list item
            });
        });
    }

    // Sets up search functionality for each dropdown (ingredients, appliances, utensils)
    setupSearchInputs() {
        const ingredientSearchInput = document.getElementById('ingredients_searchInput');
        const applianceSearchInput = document.getElementById('appliance_searchInput');
        const ustensilsSearchInput = document.getElementById('ustensils_searchInput');

        // Filter dropdown based on input for ingredients
        ingredientSearchInput.addEventListener('input', () => {
            this.filterDropdown('ingredients_list_selectable', this.ingredients, ingredientSearchInput.value.toLowerCase());
        });

        // Filter dropdown based on input for appliances
        applianceSearchInput.addEventListener('input', () => {
            this.filterDropdown('appliance_list_selectable', this.appliance, applianceSearchInput.value.toLowerCase());
        });

        // Filter dropdown based on input for utensils
        ustensilsSearchInput.addEventListener('input', () => {
            this.filterDropdown('ustensils_list_selectable', this.ustensiles, ustensilsSearchInput.value.toLowerCase());
        });
    }

    // Filters a dropdown list based on the search input
    filterDropdown(listId, items, query) {
        const list = document.getElementById(listId);
        list.innerHTML = '';  // Clear the existing dropdown list

        const filteredItems = items.filter(item => item.toLowerCase().includes(query));  // Filter items based on query
        filteredItems.forEach(item => {
            let li = document.createElement('li');  // Create new list items for the filtered results
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);

            li.addEventListener('click', () => {
                if (listId === 'ingredients_list_selectable') {
                    this.handleIngredientSelection(item);  // Handle selection for ingredients
                } else if (listId === 'appliance_list_selectable') {
                    this.handleApplianceSelection(item);  // Handle selection for appliances
                } else if (listId === 'ustensils_list_selectable') {
                    this.handleUstensileSelection(item);  // Handle selection for utensils
                }
            });
        });
    }

    // Handles ingredient selection and updates the filters
    handleIngredientSelection(ingredient) {
        if (this.selectedIngredients.includes(ingredient)) {
            this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient);  // Remove ingredient if already selected
        } else {
            this.selectedIngredients.push(ingredient);  // Add ingredient if not selected
        }
        this.updateFilterDisplay();  // Update filter display after changes
        this.applyFilters();  // Apply the filters to the recipes
        this.ingredients = this.ingredients.filter(i => i !== ingredient);  // Remove selected ingredient from the dropdown
        this.populateDropdowns();  // Repopulate dropdowns after update
    }

    // Handles appliance selection and updates the filters
    handleApplianceSelection(appliance) {
        if (this.selectedAppliances.includes(appliance)) {
            this.selectedAppliances = this.selectedAppliances.filter(a => a !== appliance);  // Remove appliance if already selected
        } else {
            this.selectedAppliances.push(appliance);  // Add appliance if not selected
        }
        this.updateFilterDisplay();  // Update filter display after changes
        this.applyFilters();  // Apply the filters to the recipes
        this.appliance = this.appliance.filter(i => i !== appliance);  // Remove selected appliance from the dropdown
        this.populateDropdowns();  // Repopulate dropdowns after update
    }

    // Handles utensil selection and updates the filters
    handleUstensileSelection(ustensil) {
        if (this.selectedUstensiles.includes(ustensil)) {
            this.selectedUstensiles = this.selectedUstensiles.filter(u => u !== ustensil);  // Remove utensil if already selected
        } else {
            this.selectedUstensiles.push(ustensil);  // Add utensil if not selected
        }
        this.updateFilterDisplay();  // Update filter display after changes
        this.applyFilters();  // Apply the filters to the recipes
        this.ustensiles = this.ustensiles.filter(i => i !== ustensil);  // Remove selected utensil from the dropdown
        this.populateDropdowns();  // Repopulate dropdowns after update
    }


    // Updates the display of the currently selected filters
    updateFilterDisplay() {
    const ingredientFilters = document.getElementById('ingredient-filters');
    const applianceFilters = document.getElementById('appliance-filters');
    const ustensilesFilters = document.getElementById('ustensiles-filters');
    
    // New container outside the dropdown
    const selectedFiltersOutside = document.getElementById('selected-filters');

    // Clear both the dropdown filters and the outside filter container
    ingredientFilters.innerHTML = '';
    applianceFilters.innerHTML = '';
    ustensilesFilters.innerHTML = '';
    selectedFiltersOutside.innerHTML = ''; // Clear the outside container

    // Add selected ingredients to both the dropdown and the outside div
    this.selectedIngredients.forEach(ingredient => {
        this.createFilterElement('ingredient', ingredient, ingredientFilters, selectedFiltersOutside);
    });

    // Add selected appliances to both the dropdown and the outside div
    this.selectedAppliances.forEach(appliance => {
        this.createFilterElement('appliance', appliance, applianceFilters, selectedFiltersOutside);
    });

    // Add selected utensils to both the dropdown and the outside div
    this.selectedUstensiles.forEach(ustensil => {
        this.createFilterElement('ustensil', ustensil, ustensilesFilters, selectedFiltersOutside);
    });

    // Update recipe count if necessary
    this.updateRecipeCount();
}


    createFilterElement(type, value, dropdownContainer, outsideContainer) {
    // Create the filter element for the dropdown
    const filterElementDropdown = document.createElement('div');
    filterElementDropdown.className = 'filter-badge';
    filterElementDropdown.innerHTML = `
        ${value}
        <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>
    `;
    dropdownContainer.appendChild(filterElementDropdown);  // Append to dropdown container

    // Create the filter element for the outside container
    const filterElementOutside = document.createElement('div');
    filterElementOutside.className = 'filter-badge';
    filterElementOutside.innerHTML = `
        ${value}
        <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>
    `;
    outsideContainer.appendChild(filterElementOutside);  // Append to outside container

    // Add event listener to remove the filter for both containers
    const removeFilter = (event) => {
        const type = event.target.getAttribute('data-type');
        const value = event.target.getAttribute('data-value');

        if (type === 'ingredient') {
            this.selectedIngredients = this.selectedIngredients.filter(i => i !== value);
        } else if (type === 'appliance') {
            this.selectedAppliances = this.selectedAppliances.filter(a => a !== value);
        } else if (type === 'ustensil') {
            this.selectedUstensiles = this.selectedUstensiles.filter(u => u !== value);
        }

        // Update the filter display and apply the filters after removing
        this.updateFilterDisplay();
        this.applyFilters();
    };

    // Attach remove listener for both dropdown and outside filter elements
    filterElementDropdown.querySelector('.remove-filter').addEventListener('click', removeFilter);
    filterElementOutside.querySelector('.remove-filter').addEventListener('click', removeFilter);
}


    // Applies the filters to the recipe list and updates the displayed recipes
    applyFilters() {
        this.filteredRecipes = this.allRecipes.filter(recipe => {
            const matchesIngredients = this.selectedIngredients.length === 0 ||
                this.selectedIngredients.every(ingredient =>
                    recipe.ingredients.some(i => i.ingredient.toLowerCase() === ingredient.toLowerCase())
                );

            const matchesAppliances = this.selectedAppliances.length === 0 ||
                this.selectedAppliances.includes(recipe.appliance);

            const matchesUstensiles = this.selectedUstensiles.length === 0 ||
                this.selectedUstensiles.every(ustensil =>
                    recipe.ustensils.some(u => u.toLowerCase() === ustensil.toLowerCase())
                );

            return matchesIngredients && matchesAppliances && matchesUstensiles;
        });

        this.haveFilter = this.selectedIngredients.length > 0 || this.selectedAppliances.length > 0 || this.selectedUstensiles.length > 0;
        this.getIngredients(this.filteredRecipes)//Update dropdown list for ingredients
        this.getAppliance(this.filteredRecipes)//Update dropdown list for appliance
        this.getUstensiles(this.filteredRecipes)//Update dropdown list for utensils
        this.displayRecipes();
    }

    // Update recipe counter
    updateRecipeCount(recepiesSize) {
        const recipeCountElement = document.getElementById('recipe-count');
        recipeCountElement.textContent = `${recepiesSize} recettes`;
    }


    displayRecipes() {
        const recipeRenderer = new RecipeRenderer('.recipe-container');
        const container = document.querySelector('.recipe-container'); // Correct the container selection

        if (this.haveFilter) {
            if (!this.filteredRecipes || this.filteredRecipes.length === 0) {
                container.innerHTML = '<p>No recipes found.</p>';
            } else {
                recipeRenderer.renderRecipes(this.filteredRecipes);
                this.updateRecipeCount(this.filteredRecipes.length)
            }
            console.log(this.filteredRecipes)
        } else {
            recipeRenderer.renderRecipes(this.allRecipes);
            this.updateRecipeCount(this.allRecipes.length)
        }
    }
}

const app = new App();
app.init();
