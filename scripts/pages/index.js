async function getRecipes() {
    // Penser à remplacer par les données récupérées dans le json
    let response = await fetch("https://tiagocarvalhomartins.github.io/TiagoCARVALHOMARTINS_7_04052022/data/recipes.json ")
    let myJSON = await response.json();
       
    
    // et bien retourner le tableau photographers seulement une fois
    return (myJSON)
}