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

   function filterIngredient(selectedIngredient) {
       if (recipes.ingredients.ingredient === selectedIngredient) {
            return displayRecipes(recipesFiltered)
        }
    }
    filterIngredient(selectedIngredient)
};

init();