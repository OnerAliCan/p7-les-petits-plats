document.addEventListener("click", function (event) {
  Object.values(dropdownContents).forEach((dropdownContent, i) => {
    if (
      !dropdownContent.contains(event.target) &&
      !dropdownButtons[i].contains(event.target)
    ) {
      dropdownContent.classList.remove("show");
    }
  });
});

function getInitialAppliancesList() {
  let recipeList = [...recipes];
  const appliancesArray = [];

  Object.values(recipeList).forEach(appliance => {
    console.log(appliance);
  });

  for (let i = 0; i < recipeList.length; i++) {
    const appliance = recipeList[i].appliance;

    appliancesArray.push(appliance);
  }
  return [...new Set(appliancesArray)];
}

Object.values(recipeList).forEach(recipe => {
  Object.values(recipe.utensils).forEach(updatedRecipe => {
    updatedIngredientArray.push(updatedRecipe.ingredients[j].ingredient);
  });
});

for (let i = 0; i < recipeList.length; i++) {
  const updatedRecipe = recipeList[i];

  for (let j = 0; j < updatedRecipe.ingredients.length; j++) {
    updatedIngredientArray.push(updatedRecipe.ingredients[j].ingredient);
  }
}
