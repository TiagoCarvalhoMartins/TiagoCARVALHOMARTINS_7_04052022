async function getRecipes() {
    // Penser à remplacer par les données récupérées dans le json
    let response = await fetch("data/recipes.json")
    let myJSON = await response.json();
       
    return (myJSON)
}

function displayRecipes(recipes) {
    const cardRecipes = document.querySelector(".cardRecipes");
    cardRecipes.innerHTML = ""
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        cardRecipes.innerHTML += recipeCardDOM;
    });
};

function displayDropdown(recipes) {
    const dropdownListAppliance = document.querySelector(".dropdown.appliances");
    const dropdownListIngredients = document.querySelector(".dropdown.ingredients");
    const dropdownListUstensils = document.querySelector(".dropdown.ustensils");
    let appliancesDuplicate = []
    let ingredientsDuplicate = []
    let ustensilsConcat = []

    //all appliances from reicipes
    recipes.forEach(function (recipes) {
        appliancesDuplicate.push(recipes.appliance)
    })
    let appliances = [...new Set(appliancesDuplicate)];


    //all ingredients from reicipes
    recipes.forEach(function (recipes) {
        recipes.ingredients.forEach(function(ingredients){
            ingredientsDuplicate.push(ingredients.ingredient)
          })
    });
    let ingredients = [...new Set(ingredientsDuplicate)];

    //all ustensils from reicipes
    recipes.forEach(function (recipes) {
        ustensilsConcat.push(recipes.ustensils)
    })
    let ustensilsDuplicate = [].concat.apply([], ustensilsConcat);
    let ustensils = [...new Set(ustensilsDuplicate)];

    function dropdownResearch (appliances, ingredients, ustensils) {

        //appliances research
        const appliancesSearchField = document.getElementById("appliance-tag-input");
        let appliancesSearchFieldValue =""
        appliancesSearchField.addEventListener('change', function() {
            appliancesSearchFieldValue = this.value;
        })
        appliances = appliances.filter(function(el) {
        return el.id = appliancesSearchFieldValue;
        });

        //ingredients research
        const ingredientsSearchField = document.getElementById("ingredients-tag-input");
        let ingredientsSearchFieldValue =""
        ingredientsSearchField.addEventListener('change', function() {
            ingredientsSearchFieldValue = this.value;
        })
        ingredients = ingredients.filter(function(el) {
        return el.id = ingredientsSearchFieldValue;
        });

        //ustensils research
        const ustensilsSearchField = document.getElementById("ustensils-tag-input");
        let ustensilsSearchFieldValue =""
        ustensilsSearchField.addEventListener('change', function() {
            ustensilsSearchFieldValue = this.value;
        })
        ustensils = ustensils.filter(function(el) {
        return el.id = ustensilsSearchFieldValue;
        });
    }

    let dropdownAppliance = dropdownFactory (appliances, dropdownListAppliance)
    let dropdownIngredients = dropdownFactory (ingredients, dropdownListIngredients)
    let dropdownUstensils = dropdownFactory (ustensils, dropdownListUstensils)
};


let selectedIngredients = "Concombre";
let selectedAppliances = ["Saladier"];
let selectedUstensils = "presse citron";

async function init() {
    const recipes  = await getRecipes();
    displayRecipes(recipes);
    displayDropdown(recipes);

   function filterIngredient(recipes, selectedAppliances, selectedUstensils) {
        const recipesFiltered = recipes.filter (function (recipe) {
            let applianceFiltered = selectedAppliances.includes(recipe.appliance) 
            let ustensilsFiltered = recipe.ustensils.includes(selectedUstensils)
            return (applianceFiltered || ustensilsFiltered)
        })
        return (recipesFiltered)
   }
    const recipesFiltered = filterIngredient(recipes, selectedAppliances, selectedUstensils)
    displayRecipes (recipesFiltered)
};

init();