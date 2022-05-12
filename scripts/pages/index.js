async function getRecipes() {
    // Penser à remplacer par les données récupérées dans le json
    let response = await fetch("data/recipes.js")
    let myJSON = await response.json();
       
    return (myJSON)
}

function displayRecipes(recipes) {
    const cardRecipes = document.querySelector(".cardRecipes");

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        cardRecipes.appendChild(recipeCardDOM);
    });
};


async function init() {
    const { recipes } = await getRecipes();
    displayRecipes(recipes);

    //filter
    let selectedIngredient = "Concombre";

    function filterIngredient (recipes) {
        if (recipes.ingredients.ingredient === selectedIngredient) {
            return displayRecipes(recipesFiltered)
        }
    }
};

init();