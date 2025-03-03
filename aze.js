function filterByUtensils(recipeList) {
  let r = [];
  const children = document.getElementById("selected-utensils").children;

  const selectedUtensilsList = [];
  for (let i = 0; i < children.length; i++) {
    selectedUtensilsList.push(children[i].textContent.toLowerCase());
  }

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];

    const allUtensilsIncluded = selectedUtensilsList.every(selectedUtensil => {
      return recipe.utensils.some(utensil => {
        return utensil.utensil.toLowerCase() === selectedUtensil;
      });
    });

    if (allUtensilsIncluded) {
      r.push(recipe);
    }
  }
  return r;
}
