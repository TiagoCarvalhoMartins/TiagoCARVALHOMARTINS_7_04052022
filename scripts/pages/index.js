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

    recipes.forEach(function (recipes) {
        appliancesDuplicate.push(recipes.appliance)
    })
    let appliances = [...new Set(appliancesDuplicate)];

    recipes.forEach(function (recipes) {
        recipes.ingredients.forEach(function(ingredients){
            ingredientsDuplicate.push(ingredients.ingredient)
          })
    });
    let ingredients = [...new Set(ingredientsDuplicate)];

    recipes.forEach(function (recipes) {
        ustensilsConcat.push(recipes.ustensils)
    })
    let ustensilsDuplicate = [].concat.apply([], ustensilsConcat);
    let ustensils = [...new Set(ustensilsDuplicate)];

    let dropdownAppliance = dropdownFactory (appliances, dropdownListAppliance)
    let dropdownIngredients = dropdownFactory (ingredients, dropdownListIngredients)
    let dropdownUstensils = dropdownFactory (ustensils, dropdownListUstensils)
    //recipes.forEach((recipe) => {
    //    const dropdownModel = dropdownFactory(recipe);
    //    const dropdownDOM = dropdownModel.getApplianceDropdownCardDOM();
    //    dropdownList.innerHTML += dropdownDOM;
    //});
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