function recipeFactory(data) {
    const { name, time, description, ingredients, quantity, unit  } = data;

    function getRecipeCardDOM() {
        let ingredientsTemplate = "";
        //ingredientsTemplate += `<strong>${ingredients[0].ingredient}:</strong> ${ingredients[0].quantity}${ingredients[0].unit}<br>`

        let cardTemplate = 
        `<div class="card col-lg-4 col-md-6 col-sm-12">
            <div class="thumbnailContainer">
                <img src="assets/thumbnail.png" class="thumbnail card-img-top">
            </div>
            <div class="texte card-body">
                <div class="titleTime d-flex flex-row justify-content-between">
                    <h2>${name}</h2>
                    <div class="time d-flex flex-row">
                        <span class="fa-regular fa-clock"></span>
                        <h3>${time} min</h3>
                    </div>
                </div>
                <div class="recipe">
                    <div class="container-fluid">
                        <div class="row d-flex flex-row">
                            <div class="neededIngredientsList col-6">
                                <h4>
                                ${ingredientsTemplate}
                                </h4>
                            </div>
                            <div class="instructions col-6">
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        //cardRecipes.innerHTML = cardTemplate
        return (cardTemplate)
    }
    return { name, time, description, ingredients, quantity, unit, getRecipeCardDOM }
}