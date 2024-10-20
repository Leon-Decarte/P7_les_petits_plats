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
        this.ustensils = [];  // List of utensils
        this.selectedIngredients = [];  // Selected ingredients for filtering
        this.selectedAppliances = [];  // Selected appliances for filtering
        this.selectedUstensiles = [];  // Selected utensils for filtering
    }

    // Initializes the app by fetching data, setting up filters, and displaying recipes
    async init() {
        await this.getAllRecipes();  // Wait for recipes to be fetched
        this.updateIngredients(this.allRecipes);  // Extract ingredients from recipes
        this.updateAppliance(this.allRecipes);  // Extract appliances from recipes
        this.updateUstensiles(this.allRecipes);  // Extract utensils from recipes
        this.populateDropdowns(this.ingredients, this.appliance, this.ustensils);  // Populate dropdowns with the fetched data
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


    // Extracts unique appliances from the fetched recipes or update appliance with filters
    updateAppliance(recepies) {
        let appliances = [];

        // Collect appliance from each recipe and convert to lowercase
        recepies.forEach(recepie => {
            appliances.push(recepie.appliance.toLowerCase())
        })

        this.appliance = [...new Set(appliances)];  // Remove duplicates by creating a Set
        if (this.selectedAppliances.length) {
            this.appliance = this.appliance.filter(item => !this.selectedAppliances.includes(item))
        }
        this.populateDropdowns(this.ingredients, this.appliance, this.ustensils);  // Update dropdowns with the extracted ingredients
        console.log("appliance", this.appliance);
    }

    // Extracts unique ustensils from the fetched recipes or update ustensils with filters
    updateUstensiles(recepies) {
        let ustensiles = [];

        // Collect ustensils from each recipe and convert to lowercase
        recepies.forEach(recepie => recepie.ustensils.forEach(ustensile => {
            ustensiles.push(ustensile.toLowerCase());
        }))

        this.ustensils = [...new Set(ustensiles)];  // Remove duplicates by creating a Set
        if (this.selectedUstensiles.length) {
            this.ustensils = this.ustensils.filter(item => !this.selectedUstensiles.includes(item))
        }
        this.populateDropdowns(this.ingredients, this.appliance, this.ustensils);  // Update dropdowns with the extracted ingredients
        console.log("ustensiles", this.ustensils);
    }

    // Extracts unique ingredients from the fetched recipes or update ingredients with filters
    updateIngredients(recepies) {
        let ingredients = [];

        // Collect ingredients from each recipe and convert to lowercase
        recepies.forEach(recepie => recepie.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient.toLowerCase());
        }))

        /*ingredientList.forEach(i => {
            ingredients.push(i.toLowerCase());  // Collect ingredients from each recipe and convert to lowercase
        });*/

        this.ingredients = [...new Set(ingredients)];  // Remove duplicates by creating a Set
        if (this.selectedIngredients.length) {
            this.ingredients = this.ingredients.filter(item => !this.selectedIngredients.includes(item))
        }
        this.populateDropdowns(this.ingredients, this.appliance, this.ustensils);  // Update dropdowns with the extracted ingredients
        console.log("ingredients", this.ingredients);
    }

    // Populates all dropdowns (ingredients, appliances, utensils) with the relevant items
    populateDropdowns(ingredients, appliance, ustensiles) {
        this.populateDropdown('ingredients_list_selectable', ingredients, 'ingredient');  // Populate ingredients dropdown
        this.populateDropdown('appliance_list_selectable', appliance, 'appliance');  // Populate appliances dropdown
        this.populateDropdown('ustensils_list_selectable', ustensiles, 'ustensil');  // Populate utensils dropdown
    }

    // Populates a specific dropdown list with items and attaches a click handler for item selection
    populateDropdown(dropdownId, items, type) {
        const list = document.getElementById(dropdownId);  // Get the dropdown list element
        list.innerHTML = '';  // Clear any existing items in the list

        items.forEach(item => {
            let li = document.createElement('li');  // Create a new list item for each item
            li.textContent = item;
            li.classList.add('list-group-item');
            list.appendChild(li);

            li.addEventListener('click', () => this.handleSelection(type, item));
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
            this.filterDropdown('ustensils_list_selectable', this.ustensils, ustensilsSearchInput.value.toLowerCase());
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

    // Handles selection (ingredients, appliances, or utensils) and updates the filters
    handleSelection = (type, item) => {
        if (type === 'ingredient') {
            this.handleIngredientSelection(item);
        } else if (type === 'appliance') {
            this.handleApplianceSelection(item);
        } else if (type === 'ustensil') {
            this.handleUstensileSelection(item);
        }
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
        this.ingredients = this.ingredients.filter(item => !this.selectedIngredients.includes(item)); // Remove selected ingredient from the dropdown
        this.populateDropdowns(this.ingredients, this.appliance, this.ustensils);  // Repopulate dropdowns after update
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
        this.appliance = this.appliance.filter(item => !this.selectedAppliances.includes(item)); // Remove selected appliance from the dropdown
        this.populateDropdowns(this.ingredients, this.appliance, this.ustensils);  // Repopulate dropdowns after update
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
        this.ustensils = this.ustensils.filter(item => !this.selectedUstensiles.includes(item));  // Remove selected utensil from the dropdown
        this.populateDropdowns(this.ingredients, this.appliance, this.ustensils);  // Repopulate dropdowns after update
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
            this.createFilters('ingredient', ingredient, ingredientFilters, selectedFiltersOutside);
        });

        // Add selected appliances to both the dropdown and the outside div
        this.selectedAppliances.forEach(appliance => {
            this.createFilters('appliance', appliance, applianceFilters, selectedFiltersOutside);
        });

        // Add selected utensils to both the dropdown and the outside div
        this.selectedUstensiles.forEach(ustensil => {
            this.createFilters('ustensil', ustensil, ustensilesFilters, selectedFiltersOutside);
        });

        // Update recipe count if necessary
        this.updateRecipeCount();
    }


    //Create drop-down and outside filters
    createFilters(type, value, dropdownContainer, outsideContainer) {
        this.createFilter(value, type, dropdownContainer);
        this.createFilter(value, type, outsideContainer);
    }


    // Create filter element
    createFilter(value, type, dropdownContainer) {
        // Create the filter element for the dropdown
        const filterElement = document.createElement('div');
        filterElement.className = 'filter-badge';
        filterElement.innerHTML = `
        ${value}
        <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>
    `;
        dropdownContainer.appendChild(filterElement);  // Append to dropdown container
        // Attach remove listener for both dropdown and outside filter elements
        filterElement.querySelector('.remove-filter').addEventListener('click', this.removeFilter());

    }

    removeFilter() {
        // Add event listener to remove the filter for both containers
        return (event) => {
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
    }

    // Applies the filters to the recipe list and updates the displayed recipes
    applyFilters() {
        this.matchFilters();
        this.haveFilter = this.selectedIngredients.length > 0 || this.selectedAppliances.length > 0 || this.selectedUstensiles.length > 0;
        this.updateIngredients(this.filteredRecipes)//Update dropdown list for ingredients
        this.updateAppliance(this.filteredRecipes)//Update dropdown list for appliance
        this.updateUstensiles(this.filteredRecipes)//Update dropdown list for utensils
        this.displayRecipes();
    }

    //Get filtered list of recepies according to selected filters
    matchFilters() {
        this.filteredRecipes = this.allRecipes.filter(recipe => {
            //Check if any filter selected for ingredients
            const matchesIngredients = this.selectedIngredients.length === 0 ||
                this.selectedIngredients.every(ingredient =>
                    recipe.ingredients.some(i => i.ingredient.toLowerCase() === ingredient.toLowerCase())
                );
            //Check if any filter selected for appliance
            const matchesAppliances = this.selectedAppliances.length === 0 ||
                this.selectedAppliances.includes(recipe.appliance.toLowerCase());
            //Check if any filter selected for ustensils
            const matchesUstensiles = this.selectedUstensiles.length === 0 ||
                this.selectedUstensiles.every(ustensil =>
                    recipe.ustensils.some(u => u.toLowerCase() === ustensil.toLowerCase())
                );

            return matchesIngredients && matchesAppliances && matchesUstensiles;
        });
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