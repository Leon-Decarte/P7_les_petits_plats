export class DropdownManager {
    constructor(appInstance) {
        this.app = appInstance; // Storing reference to the main app instance
    }

    initDropdowns() {
        // Initialize the dropdowns with event listeners for toggling visibility
        document.querySelectorAll('.dropdown-toggle').forEach(button => {
            button.addEventListener('click', (event) => {
                const dropdownMenu = event.currentTarget.nextElementSibling;
                
                // Check if the dropdown menu is found
                if (dropdownMenu) {
                    // Toggle the 'active' class to show or hide the dropdown menu
                    dropdownMenu.classList.toggle('active');
                    
                    // Log to check if the dropdown is toggled
                    console.log('Dropdown toggled:', dropdownMenu.classList.contains('active'));

                    // Render dropdown items when the menu is shown
                    if (dropdownMenu.classList.contains('active')) {
                        this.renderDropdownItems(dropdownMenu);
                    }
                } else {
                    console.error('Dropdown menu not found.');
                }
            });
        });

        // Call function to populate dropdown options
        this.populateDropdownOptions();
    }

    populateDropdownOptions() {
        // Access the recipes data from the main App
        const { allRecipes } = this.app;

        // If the data exists, extract and populate options
        if (allRecipes) {
            const ingredients = this.app.dataFetcher.extractIngredients(allRecipes);
            const appliances = this.app.dataFetcher.extractAppliances(allRecipes);
            const ustensils = this.app.dataFetcher.extractUstensils(allRecipes);

            // Store the options in the app instance to be used later
            this.app.dropdownOptions = {
                ingredients,
                appliances,
                ustensils
            };
        } else {
            console.error("No recipes data found to populate dropdown options.");
        }
    }

    renderDropdownItems(dropdownMenu) {
        const dropdownId = dropdownMenu.id;

        let items = [];
        if (dropdownId === 'ingredients_dropdown_container') {
            items = this.app.dropdownOptions.ingredients || [];
        } else if (dropdownId === 'appliance_dropdown_container') {
            items = this.app.dropdownOptions.appliances || [];
        } else if (dropdownId === 'utensils_dropdown_container') {
            items = this.app.dropdownOptions.ustensils || [];
        }

        this.populateDropdownMenu(dropdownMenu.querySelector('.dropdown-menu'), items);
    }

    populateDropdownMenu(dropdownList, items) {
        if (!dropdownList) {
            console.error('Dropdown list not found.');
            return;
        }

        dropdownList.innerHTML = ''; // Clear previous content

        items.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('dropdown-item');
            li.textContent = item;
            li.addEventListener('click', () => {
                // Handle item selection here
                console.log('Item selected:', item);
            });
            dropdownList.appendChild(li);
        });

        // Log to verify dropdown items are added
        console.log('Dropdown items rendered:', items);
    }
}
