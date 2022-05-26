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
    const dropdownList = document.querySelector(".applianceDropdown");
    dropdownList.innerHTML = ""
    recipes.forEach((recipe) => {
        const dropdownModel = dropdownFactory(recipe);
        const dropdownDOM = dropdownModel.getApplianceDropdownCardDOM();
        dropdownList.innerHTML += dropdownDOM;
    });
};

function dropdownListener () {
    const tagDiv = document.querySelector(".tags")
    const dropdownModel = dropdownFactory();
    const tagCreation = dropdownModel.addListener ();
    tagDiv.appendChild(tagCreation) 
}

let selectedIngredients = "Concombre";
let selectedAppliances = ["Saladier"];
let selectedUstensils = "presse citron";

async function init() {
    const recipes  = await getRecipes();
    displayRecipes(recipes);
    displayDropdown(recipes);
    dropdownListener();

   function filterIngredient(recipes, selectedAppliances, selectedUstensils) {
       //if (recipes.ingredients.ingredient == selectedIngredient && recipes.appliance == selectedAppliance && 
        //recipes.ustensils == selectedUstensil) {
        //  return displayRecipes(recipesFiltered)
        //}
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