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


async function init() {
    const recipes  = await getRecipes();
    displayRecipes(recipes);

    //filter
    let selectedIngredient = "Concombre";
    let selectedAppliance = "Saladier";
    let selectedUstensil = "presse citron";

   function filterIngredient(selectedIngredient, selectedAppliance, selectedUstensil) {
       if (ingredients.ingredient == selectedIngredient) {
            return displayRecipes(recipesFiltered)
        } if (appliance == selectedAppliance) {
            return displayRecipes(recipesFiltered)
        } if (ustensils == selectedUstensil) {
            return displayRecipes(recipesFiltered)
        }
    }
    filterIngredient(selectedIngredient)
};

init();