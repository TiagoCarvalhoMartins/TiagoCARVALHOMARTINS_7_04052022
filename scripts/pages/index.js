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

function getItemsList(recipes) {
    let appliancesDuplicate = []
    let ingredientsDuplicate = []
    let ustensilsConcat = []

    //all appliances from reicipes
    recipes.forEach(function (recipes) {
        appliancesDuplicate.push(recipes.appliance)
    })
    let appliances = [...new Set(appliancesDuplicate)];
    appliances.sort()


    //all ingredients from reicipes
    recipes.forEach(function (recipes) {
        recipes.ingredients.forEach(function(ingredients){
            ingredientsDuplicate.push(ingredients.ingredient)
          })
    });
    let ingredients = [...new Set(ingredientsDuplicate)];
    ingredients.sort()

    //all ustensils from reicipes
    recipes.forEach(function (recipes) {
        ustensilsConcat.push(recipes.ustensils)
    })
    let ustensilsDuplicate = [].concat.apply([], ustensilsConcat);
    let ustensils = [...new Set(ustensilsDuplicate)];
    ustensils.sort()

    return ([appliances, ingredients, ustensils])

}

function updateDropdown(recipes) {

    const itemList = getItemsList(recipes)
    dropdownAppliance.getItemDropdownCardDOM(itemList[0])
    dropdownIngredients.getItemDropdownCardDOM(itemList[1])
    dropdownUstensils.getItemDropdownCardDOM(itemList[2])

    
}

const dropdownListAppliance = document.querySelector(".dropdown.appliances");
const dropdownListIngredients = document.querySelector(".dropdown.ingredients");
const dropdownListUstensils = document.querySelector(".dropdown.ustensils");

let dropdownAppliance = dropdownFactory (dropdownListAppliance)
let dropdownIngredients = dropdownFactory (dropdownListIngredients)
let dropdownUstensils = dropdownFactory (dropdownListUstensils)

async function init() {
    const recipes  = await getRecipes();
    displayRecipes(recipes);
    updateDropdown(recipes);

   function filterIngredient(recipes, selectedItems) {
        let recipesFiltered = recipes.filter (function (recipe) {
            let applianceFiltered = recipe.appliances.includes(selectedItems) 
            let ustensilsFiltered = recipe.ustensils.includes(selectedItems)
            let ingredientsFiltered = recipe.ingredients.includes(selectedItems)
            return (applianceFiltered || ustensilsFiltered || ingredientsFiltered)
        })
        return (recipesFiltered)
   }
    let recipesFiltered = filterIngredient(recipes, ustensilsFiltered, applianceFiltered, ingredientsFiltered)
    displayRecipes (recipesFiltered)
};

init();