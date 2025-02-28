function updateAppliancesList(recipeList) {
  let updatedApplianceArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const updatedRecipe = recipeList[i];

    for (let j = 0; j < updatedRecipe.appliances.length; j++) {
      updatedApplianceArray.push(updatedRecipe.appliances[j].appliance);
    }
  }

  const updatedUniqueAppliances = [...new Set(updatedApplianceArray)];

  return updatedUniqueAppliances;
}
