function recipeFactory(data) {
    const { name, time, description, ingredient, quantity, unit  } = data;

    function getRecipeCardDOM() {
        let cardTemplate = 
        `<div class="card col-lg-4 col-md-6 col-sm-12">
            <div class="thumbnailContainer">
                <img src="assets/thumbnail.png" class="thumbnail card-img-top">
            </div>
            <div class="texte card-body">
                <div class="titleTime d-flex flex-row justify-content-between">
                    <h2>${recipes.name}</h2>
                    <div class="time d-flex flex-row">
                        <span class="fa-regular fa-clock"></span>
                        <h3>${recipes.time} min</h3>
                    </div>
                </div>
                <div class="recipe">
                    <div class="container-fluid">
                        <div class="row d-flex flex-row">
                            <div class="neededIngredientsList col-6">
                                <h4>
                                    <strong>${recipes.ingredients.ingredient[0]}:</strong> ${recipes.ingredients.quantity[0]}${recipes.ingredients.unit[0]}<br>
                                    <strong>${recipes.ingredients.ingredient[1]}:</strong> ${recipes.ingredients.quantity[1]}${recipes.ingredients.unit[1]}<br>
                                    <strong>${recipes.ingredients.ingredient[2]}:</strong> ${recipes.ingredients.quantity[2]}${recipes.ingredients.unit[2]}<br>
                                    <strong>${recipes.ingredients.ingredient[3]}:</strong> ${recipes.ingredients.quantity[3]}${recipes.ingredients.unit[3]}<br>
                                    <strong>${recipes.ingredients.ingredient[4]}:</strong> ${recipes.ingredients.quantity[4]}${recipes.ingredients.unit[4]}<br>
                                </h4>
                            </div>
                            <div class="instructions col-6">
                                <p>${recipes.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        cardRecipes.innerHTML = cardTemplate
    }
    return { name, time, description, ingredient, quantity, unit, getRecipeCardDOM }
}