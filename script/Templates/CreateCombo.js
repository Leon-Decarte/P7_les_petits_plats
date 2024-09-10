import { DataFetcher } from '../Api/dataFetcher.js';

export class CreateCombo {
    constructor(who, app) {
        this.who=who
        this.app=app

        this.dataFetcher = new DataFetcher();
        this.init();
    }

    async init() {
        console.log("lancement de init")
        let containerId="";
        this.datas=[];
        console.log(this.app)
        let recipes= this.app.haveFilter ? this.app.filteredRecipes : this.app.allRecipes;
        switch(this.who) {
            case 'ingredient':
                datas  = await this.dataFetcher.extractIngredients(recipes);
                containerId='ingredients_dropdown_container';
                console.log(datas)
                break;
            case 'appliance':
                datas  = await this.dataFetcher.extractAppliances(recipes);
                containerId='appliance_dropdown_container';
                console.log(datas)

                break;
            case 'ustensil':
                datas  = await this.dataFetcher.extractUstensils(recipes);
                containerId='ustensil_dropdown_container';
                console.log(datas)

                break;
        }
        this.container = document.getElementById(containerId);
        console.log(this.who)
        
        console.log('datas:', datas);  // Log the received data
        this.populateDropdown();
        console.log(this.datas);
    }

    populateDropdown() {
        if (this.container) {
            this.datas.forEach(data => {
                const option = document.createElement('option');
                option.value = data;
                option.textContent = data.charAt(0).toUpperCase() + data.slice(1);
                this.container.appendChild(option);
            });
        }
    }
}
