let recipes = [];

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
    dropdownAppliances.initDropdown(itemList[0])
    dropdownIngredients.initDropdown(itemList[1])
    dropdownUstensils.initDropdown(itemList[2])
    dropdownAppliances.getItemDropdownCardDOM(itemList[0])
    dropdownIngredients.getItemDropdownCardDOM(itemList[1])
    dropdownUstensils.getItemDropdownCardDOM(itemList[2])

    
}

function search () {
    const appliancesSelected = dropdownAppliances.selectedItems
    const ustensilsSelected = dropdownUstensils.selectedItems
    const ingredientsSelected = dropdownIngredients.selectedItems
    let recipesFiltered = filterRecipes(recipes, appliancesSelected, ingredientsSelected, ustensilsSelected)
    displayRecipes (recipesFiltered)
    
}

function searchBar() {
    const mainSearchBar = document.getElementById("search-tag-input")
    mainSearchBar.addEventListener('input', mainSearchBarResult)
}

function mainSearchBarResult(recipes) {
    mainSearchBarValue = this.value;
    let ingredientSearch = recipes.ingredients.find(function (ingredient) { 
        mainSearchBarValue.includes(ingredient.ingredient)
        return ingredientSearch
    })

    let recipesSearchFiltered = recipes.filter (function (recipe) {
        recipe.forEach(function (recipes) {
            if (recipes.name.includes(mainSearchBarValue)) {
                return true;
            } if (recipes.description.includes(mainSearchBarValue)) {
                return true;
            } if (ingredientSearch = true){
                return true;
            } else {
                return false
            }
        })
    })
    return (recipesSearchFiltered)
}


const dropdownListAppliances = document.querySelector(".dropdown.appliances");
const dropdownListIngredients = document.querySelector(".dropdown.ingredients");
const dropdownListUstensils = document.querySelector(".dropdown.ustensils");

let dropdownAppliances = dropdownFactory (dropdownListAppliances)
let dropdownIngredients = dropdownFactory (dropdownListIngredients)
let dropdownUstensils = dropdownFactory (dropdownListUstensils)

async function init() {
    recipes  = await getRecipes();
    displayRecipes(recipes);
    searchBar()
    updateDropdown(recipes);
};

function filterRecipes(recipes, appliancesSelected, ingredientsSelected, ustensilsSelected) {

    let recipesFiltered = recipes.filter (function (recipe) {
        let hasAppliance = appliancesSelected.includes(recipe.appliance)

        let findUstensils = recipe.ustensils.find(function (ustensil) { 
            let hasUstensil = ustensilsSelected.includes(ustensil)
            return hasUstensil
         })
        let hasUstensil = findUstensils !== undefined 

        let findIngredients = recipe.ingredients.find(function (ingredient) { 
           let hasIngredient = ingredientsSelected.includes(ingredient.ingredient)
           return hasIngredient
        })
        let hasIngredient = findIngredients !== undefined

        return hasAppliance || hasIngredient || hasUstensil
    })
    return (recipesFiltered)
}

init();