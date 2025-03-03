window.addEventListener("load", () => {
  let recipeList = [...recipes];
  setEvents();
  displayRecipes(recipeList);
});

let appliances = [];
let utensils = [];
let uniqueIngredients = [];

function setEvents() {
  // set variables
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;
  let recipeList = [...recipes];
  const ingredientsDropdownButton = document.getElementById(
    "ingredients-dropdown-button"
  ).firstElementChild;

  const appliancesDropdownButton = document.getElementById(
    "appliances-dropdown-button"
  ).firstElementChild;

  const utensilsDropdownButton = document.getElementById(
    "utensils-dropdown-button"
  ).firstElementChild;

  const dropdownButtons = document.getElementsByClassName("dropdown-button");
  const dropdownContents = document.getElementsByClassName("dropdown-content");

  // Enlever la classe 'show' si on clique en dehors des dropdowns
  document.addEventListener("click", function (event) {
    for (let i = 0; i < dropdownContents.length; i++) {
      if (
        !dropdownContents[i].contains(event.target) &&
        !dropdownButtons[i].contains(event.target)
      ) {
        dropdownContents[i].classList.remove("show");
      }
    }
  });

  // flatten arrays

  uniqueIngredients = getInitialIngredientsList();

  appliances = getInitialAppliancesList();

  utensils = getInitialUtensilsList();

  // close dropdown at main bar input

  const ingredientsDropdownContent =
    ingredientsDropdownButton.nextElementSibling;

  const appliancesDropdownContent = appliancesDropdownButton.nextElementSibling;
  const utensilsDropdownContent = utensilsDropdownButton.nextElementSibling;

  searchInput.addEventListener("focus", function () {
    ingredientsDropdownContent.classList.remove("show");
  });

  searchInput.addEventListener("focus", function () {
    appliancesDropdownContent.classList.remove("show");
  });

  searchInput.addEventListener("focus", function () {
    utensilsDropdownContent.classList.remove("show");
  });

  // main bar input search and dropdown click reset call

  searchInput.addEventListener("input", () => {
    recipeList = mainSearch();
    resetIngredientsDropdownEvent();
    resetAppliancesDropdownEvent();
    resetUtensilsDropdownEvent();
  });

  // dropdown click handlers

  function handleIngredientsDropdownClick() {
    ingredientsDropdownFill(uniqueIngredients);
    ingredientsDropdownToggle(ingredientsDropdownContent);
  }

  function handleAppliancesDropdownClick() {
    appliancesDropdownFill(appliances);
    appliancesDropdownToggle(appliancesDropdownContent);
  }

  function handleUtensilsDropdownClick() {
    utensilsDropdownFill(utensils);
    utensilsDropdownToggle(utensilsDropdownContent);
  }

  // dropdown events reset
  function resetIngredientsDropdownEvent() {
    ingredientsDropdownButton.removeEventListener(
      "click",
      handleIngredientsDropdownClick
    );
    ingredientsDropdownButton.addEventListener(
      "click",
      handleIngredientsDropdownClick
    );
  }
  resetIngredientsDropdownEvent();

  function resetAppliancesDropdownEvent() {
    appliancesDropdownButton.removeEventListener(
      "click",
      handleAppliancesDropdownClick
    );
    appliancesDropdownButton.addEventListener(
      "click",
      handleAppliancesDropdownClick
    );
  }
  resetAppliancesDropdownEvent();

  function resetUtensilsDropdownEvent() {
    utensilsDropdownButton.removeEventListener(
      "click",
      handleUtensilsDropdownClick
    );
    utensilsDropdownButton.addEventListener(
      "click",
      handleUtensilsDropdownClick
    );
  }
  resetUtensilsDropdownEvent();
}

function mainSearch() {
  let recipeList = [...recipes];
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;

  //main bar search
  if (searchInput.value.length > 2) {
    recipeList = filterBySearch(recipeList, searchInput);
  }

  // ingredients filter call
  const selectedIngredientsChildren = document.getElementById(
    "selected-ingredients"
  ).children;

  if (selectedIngredientsChildren.length > 0) {
    recipeList = filterByIngredients(recipeList);
  }

  // appliances filter call
  const selectedAppliancesChildren = document.getElementById(
    "selected-appliances"
  ).children;

  if (selectedAppliancesChildren.length > 0) {
    recipeList = filterByAppliances(recipeList);
  }

  // utensils filter call
  const selectedUtensilsChildren =
    document.getElementById("selected-utensils").children;

  if (selectedUtensilsChildren.length > 0) {
    recipeList = filterByUtensils(recipeList);
  }

  // recipe display & displayed number change

  if (recipeList.length !== 0) {
    displayRecipes(recipeList);
  } else {
    displayNoRecipes();
  }

  // update dropdown lists
  uniqueIngredients = updateIngredientsList(recipeList);
  appliances = updateAppliancesList(recipeList);

  utensils = updateUtensilsList(recipeList);

  return recipeList;
}

function filterBySearch(recipeList, searchInput) {
  const r = [];
  const searchValue = searchInput.value.toLowerCase();
  // const searchValueArray = [];
  // searchValueArray.shift();
  // searchValueArray.push(searchValue);
  // const searchValueArrayFirstValue = searchValueArray[0];

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];
    let ingredientName;

    if (
      recipe.name.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue)
    ) {
      r.push(recipe);
      continue;
    }

    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientName = recipe.ingredients[j].ingredient;

      if (ingredientName.toLowerCase().includes(searchValue)) {
        r.push(recipe);
        break;
      }
    }
  }
  return r;
}
function getInitialIngredientsList() {
  let recipeList = [...recipes];
  const ingredientArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientArray.push(recipe.ingredients[j].ingredient);
    }
  }
  return [...new Set(ingredientArray)];
}

function getInitialAppliancesList() {
  let recipeList = [...recipes];
  const appliancesArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const appliance = recipeList[i].appliance;

    appliancesArray.push(appliance);
  }
  return [...new Set(appliancesArray)];
}

function getInitialUtensilsList() {
  let recipeList = [...recipes];
  const utensilsArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const utensilList = recipeList[i].ustensils;
    for (let j = 0; j < utensilList.length; j++) {
      let utensil = utensilList[j];
      utensil = utensil.toLowerCase();
      utensil =
        utensil.charAt(0).toUpperCase() + utensil.slice(1).toLowerCase();
      utensilsArray.push(utensil);
    }
  }
  const uniqueUtensilsArray = [...new Set(utensilsArray)];
  return uniqueUtensilsArray;
}

function updateIngredientsList(recipeList) {
  let updatedIngredientArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const updatedRecipe = recipeList[i];

    for (let j = 0; j < updatedRecipe.ingredients.length; j++) {
      updatedIngredientArray.push(updatedRecipe.ingredients[j].ingredient);
    }
  }

  const updatedUniqueIngredients = [...new Set(updatedIngredientArray)];

  return updatedUniqueIngredients;
}

function updateAppliancesList(recipeList) {
  let updatedApplianceArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const updatedRecipe = recipeList[i];
    updatedApplianceArray.push(updatedRecipe.appliance);
  }

  const updatedUniqueAppliances = [...new Set(updatedApplianceArray)];

  return updatedUniqueAppliances;
}

function updateUtensilsList(recipeList) {
  let updatedUtensilArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const updatedRecipe = recipeList[i];
    for (let j = 0; j < updatedRecipe.ustensils.length; j++) {
      updatedRecipe.ustensils[j] =
        updatedRecipe.ustensils[j].charAt(0).toUpperCase() +
        updatedRecipe.ustensils[j].slice(1).toLowerCase();
      updatedUtensilArray.push(updatedRecipe.ustensils[j]);
    }
  }

  const updatedUniqueUtensils = [...new Set(updatedUtensilArray)];

  return updatedUniqueUtensils;
}

function filterByIngredients(recipeList) {
  let r = [];
  const children = document.getElementById("selected-ingredients").children;

  const selectedIngredientsList = [];
  for (let i = 0; i < children.length; i++) {
    selectedIngredientsList.push(children[i].textContent.toLowerCase());
  }

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];

    const allIngredientsIncluded = selectedIngredientsList.every(
      selectedIngredient => {
        return recipe.ingredients.some(ingredient => {
          return ingredient.ingredient.toLowerCase() === selectedIngredient;
        });
      }
    );

    if (allIngredientsIncluded) {
      r.push(recipe);
    }
  }
  return r;
}

function filterByAppliances(recipeList) {
  let r = [];
  const children = document.getElementById("selected-appliances").children;

  const selectedAppliancesList = [];
  for (let i = 0; i < children.length; i++) {
    selectedAppliancesList.push(children[i].textContent.toLowerCase());
  }

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];

    const allAppliancesIncluded = selectedAppliancesList.every(
      selectedAppliance => {
        return recipe.appliance.toLowerCase() === selectedAppliance;
      }
    );

    if (allAppliancesIncluded) {
      r.push(recipe);
    }
  }
  return r;
}

// function filterByUtensils(recipeList) {
//   let r = [];
//   const children = document.getElementById("selected-utensils").children;

//   const selectedUtensilsList = [];
//   for (let i = 0; i < children.length; i++) {
//     selectedUtensilsList.push(children[i].textContent.toLowerCase());
//   }

//   for (let i = 0; i < recipeList.length; i++) {
//     const recipe = recipeList[i];

//     const allUtensilsIncluded = selectedUtensilsList.every(selectedUtensil => {
//       return recipe.utensil.toLowerCase() === selectedUtensil;
//     });

//     if (allUtensilsIncluded) {
//       r.push(recipe);
//     }
//   }
//   return r;
// }

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
      return recipe.ustensils.some(utensil => {
        return utensil.toLowerCase() === selectedUtensil;
      });
    });

    if (allUtensilsIncluded) {
      r.push(recipe);
    }
  }

  return r;
}

function filterList(dropdownSearchInput, index) {
  const filter = dropdownSearchInput.value.toUpperCase();
  const div = document.querySelectorAll(".dropdown-content")[index];
  const a = div.getElementsByTagName("a");

  for (let i = 0; i < a.length; i++) {
    let txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function ingredientsDropdownFill(uniqueIngredients) {
  const children = document.getElementById("selected-ingredients").children;
  const selectedIngredients = [];
  for (let i = 0; i < children.length; i++) {
    selectedIngredients.push(children[i].textContent);
  }

  const filteredUniqueElementNames = uniqueIngredients.filter(
    ingredient => !selectedIngredients.includes(ingredient)
  );

  let uniqueElementName;
  const ingredientsDropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const ingredientsDropdownContent = document.getElementById(
    "dropdown-ingredients-container"
  );

  let ingredientsDropdownItemClone;
  ingredientsDropdownContent.innerHTML = "";

  for (let j = 0; j < filteredUniqueElementNames.length; j++) {
    uniqueElementName = filteredUniqueElementNames[j];
    ingredientsDropdownItemClone = document.importNode(
      ingredientsDropdownItemTemplate.content,
      true
    ).firstElementChild;
    ingredientsDropdownItemClone.innerText = uniqueElementName;

    ingredientsDropdownContent.appendChild(ingredientsDropdownItemClone);
  }

  const ingredientsDropdownItems =
    ingredientsDropdownContent.querySelectorAll(".item-dropdown");
  for (let k = 0; k < ingredientsDropdownItems.length; k++) {
    const dropdownItem = ingredientsDropdownItems[k];
    dropdownItem.addEventListener("click", handleIngredientClick);
  }

  const ingredientsDropdownSearchInputs =
    document.querySelectorAll(".dropdown-search");

  for (let l = 0; l < ingredientsDropdownSearchInputs.length; l++) {
    const ingredientsDropdownSearchInput = ingredientsDropdownSearchInputs[l];
    ingredientsDropdownSearchInput.addEventListener("input", () => {
      filterList(ingredientsDropdownSearchInput, l);
    });
  }

  const clearButtons = document.querySelectorAll(".clear-button");

  for (let m = 0; m < clearButtons.length; m++) {
    const clearButton = clearButtons[m];
    clearButton.addEventListener("click", () => clearInput(m));
  }

  return selectedIngredients;
}

function appliancesDropdownFill(appliances) {
  const children = document.getElementById("selected-appliances").children;
  const selectedAppliances = [];

  for (let i = 0; i < children.length; i++) {
    selectedAppliances.push(children[i].textContent);
  }

  const filteredUniqueElementNames = appliances.filter(
    appliance => !selectedAppliances.includes(appliance)
  );

  let uniqueElementName;
  const appliancesDropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const appliancesDropdownContent = document.getElementById(
    "dropdown-appliances-container"
  );

  let appliancesDropdownItemClone;

  appliancesDropdownContent.innerHTML = "";

  for (let j = 0; j < filteredUniqueElementNames.length; j++) {
    uniqueElementName = filteredUniqueElementNames[j];
    appliancesDropdownItemClone = document.importNode(
      appliancesDropdownItemTemplate.content,
      true
    ).firstElementChild;
    appliancesDropdownItemClone.innerText = uniqueElementName;

    appliancesDropdownContent.appendChild(appliancesDropdownItemClone);
  }

  const appliancesDropdownItems =
    appliancesDropdownContent.querySelectorAll(".item-dropdown");
  for (let k = 0; k < appliancesDropdownItems.length; k++) {
    const dropdownItem = appliancesDropdownItems[k];
    dropdownItem.addEventListener("click", handleApplianceClick);
  }

  const appliancesDropdownSearchInputs =
    document.querySelectorAll(".dropdown-search");

  for (let l = 0; l < appliancesDropdownSearchInputs.length; l++) {
    const appliancesDropdownSearchInput = appliancesDropdownSearchInputs[l];
    appliancesDropdownSearchInput.addEventListener("input", () => {
      filterList(appliancesDropdownSearchInput, l);
    });
  }

  const clearButtons = document.querySelectorAll(".clear-button");

  for (let m = 0; m < clearButtons.length; m++) {
    const clearButton = clearButtons[m];
    clearButton.addEventListener("click", () => clearInput(m));
  }
  return selectedAppliances;
}

function utensilsDropdownFill(utensils) {
  const children = document.getElementById("selected-utensils").children;
  const selectedUtensils = [];

  for (let i = 0; i < children.length; i++) {
    selectedUtensils.push(children[i].textContent);
  }

  const filteredUniqueElementNames = utensils.filter(
    utensil => !selectedUtensils.includes(utensil)
  );

  let uniqueElementName;
  const utensilsDropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const utensilsDropdownContent = document.getElementById(
    "dropdown-utensils-container"
  );

  let utensilsDropdownItemClone;

  utensilsDropdownContent.innerHTML = "";

  for (let j = 0; j < filteredUniqueElementNames.length; j++) {
    uniqueElementName = filteredUniqueElementNames[j];
    utensilsDropdownItemClone = document.importNode(
      utensilsDropdownItemTemplate.content,
      true
    ).firstElementChild;
    utensilsDropdownItemClone.innerText = uniqueElementName;

    utensilsDropdownContent.appendChild(utensilsDropdownItemClone);
  }

  const utensilsDropdownItems =
    utensilsDropdownContent.querySelectorAll(".item-dropdown");

  for (let k = 0; k < utensilsDropdownItems.length; k++) {
    const dropdownItem = utensilsDropdownItems[k];

    dropdownItem.addEventListener("click", handleUtensilClick);
  }

  const utensilsDropdownSearchInputs =
    document.querySelectorAll(".dropdown-search");

  for (let l = 0; l < utensilsDropdownSearchInputs.length; l++) {
    const utensilsDropdownSearchInput = utensilsDropdownSearchInputs[l];
    utensilsDropdownSearchInput.addEventListener("input", () => {
      filterList(utensilsDropdownSearchInput, l);
    });
  }

  const clearButtons = document.querySelectorAll(".clear-button");

  for (let m = 0; m < clearButtons.length; m++) {
    const clearButton = clearButtons[m];
    clearButton.addEventListener("click", () => clearInput(m));
  }

  return selectedUtensils;
}

function handleIngredientClick(event) {
  const selectedClick = event.target;
  const selectedClickText = selectedClick.textContent;

  // createChips(selectedClick, selectedClickText);

  selectedClick.parentElement.parentElement.classList.remove("show");
  selectIngredientItem(selectedClick, selectedClickText);

  mainSearch();
  ingredientsDropdownFill(uniqueIngredients);
}

function handleApplianceClick(event) {
  const selectedClick = event.target;
  const selectedClickText = selectedClick.textContent;

  // createChips(selectedClick, selectedClickText);

  selectedClick.parentElement.parentElement.classList.remove("show");
  selectApplianceItem(selectedClick, selectedClickText);
  mainSearch();
  console.log(appliances);

  appliancesDropdownFill(appliances);
}

function handleUtensilClick(event) {
  const selectedClick = event.target;
  const selectedClickText = selectedClick.textContent;

  // createChips(selectedClick, selectedClickText);

  selectedClick.parentElement.parentElement.classList.remove("show");
  selectUtensilItem(selectedClick, selectedClickText);
  mainSearch();
  utensilsDropdownFill(utensils);
}

function ingredientsDropdownToggle(ingredientsDropdownContent) {
  if (ingredientsDropdownContent.classList.contains("show")) {
    ingredientsDropdownContent.classList.remove("show");
  } else {
    ingredientsDropdownContent.classList.add("show");
  }
}

function appliancesDropdownToggle(appliancesDropdownContent) {
  if (appliancesDropdownContent.classList.contains("show")) {
    appliancesDropdownContent.classList.remove("show");
  } else {
    appliancesDropdownContent.classList.add("show");
  }
}

function utensilsDropdownToggle(utensilsDropdownContent) {
  if (utensilsDropdownContent.classList.contains("show")) {
    utensilsDropdownContent.classList.remove("show");
  } else {
    utensilsDropdownContent.classList.add("show");
  }
}

function selectIngredientItem(selectedClick, selectedClickText) {
  // changer la div sur le dropdown
  const selectedIngredientsDiv = document.getElementById(
    "selected-ingredients"
  );

  selectedClick.removeEventListener("click", handleIngredientClick);

  selectedClick.classList.replace("item-dropdown", "selected-item");
  const deselectCross = document.createElement("img");
  deselectCross.setAttribute("src", "assets/circle-xmark-solid.svg");

  const selectedIngredientDiv = document.createElement("div");

  selectedIngredientDiv.classList.add(
    "selected-ingredient-on-dropdown-container"
  );

  selectedIngredientDiv.classList.add("selected-item-on-dropdown-container");

  selectedIngredientDiv.appendChild(selectedClick);
  selectedIngredientDiv.appendChild(deselectCross);
  selectedIngredientsDiv.appendChild(selectedIngredientDiv);

  // créer la chip

  const selectedChipsTemplate = document.getElementById("chips-template");
  const selectedChipsTemplateClone =
    selectedChipsTemplate.content.cloneNode(true).firstElementChild;
  const chipsContainer = document.querySelector(".chips-container");

  chipsContainer.appendChild(selectedChipsTemplateClone);

  selectedChipsTemplateClone.querySelector(".chips-text").innerText =
    selectedClick.textContent;

  selectedChipsTemplateClone.firstElementChild.addEventListener("click", () => {
    removeIngredientFromDropdown(selectedClickText);
    removeChips(selectedClickText);
    mainSearch();
  });

  deselectCross.addEventListener("click", () => {
    removeIngredientFromDropdown(selectedClickText);

    // document
    //   .getElementById("dropdown-ingredients-content")
    //   .classList.remove("show");

    removeChips(selectedClickText);
    mainSearch();
  });
}
function selectApplianceItem(selectedClick, selectedClickText) {
  // changer la div sur le dropdown
  const selectedAppliancesDiv = document.getElementById("selected-appliances");

  selectedClick.removeEventListener("click", handleApplianceClick);

  selectedClick.classList.replace("item-dropdown", "selected-item");
  const deselectCross = document.createElement("img");
  deselectCross.setAttribute("src", "assets/circle-xmark-solid.svg");

  const selectedApplianceDiv = document.createElement("div");

  selectedApplianceDiv.classList.add(
    "selected-appliance-on-dropdown-container"
  );
  selectedApplianceDiv.classList.add("selected-item-on-dropdown-container");

  selectedApplianceDiv.appendChild(selectedClick);
  selectedApplianceDiv.appendChild(deselectCross);
  selectedAppliancesDiv.appendChild(selectedApplianceDiv);

  // créer la chip

  const selectedChipsTemplate = document.getElementById("chips-template");
  const selectedChipsTemplateClone =
    selectedChipsTemplate.content.cloneNode(true).firstElementChild;
  const chipsContainer = document.querySelector(".chips-container");

  chipsContainer.appendChild(selectedChipsTemplateClone);

  selectedChipsTemplateClone.querySelector(".chips-text").innerText =
    selectedClick.textContent;

  selectedChipsTemplateClone.firstElementChild.addEventListener("click", () => {
    removeApplianceFromDropdown(selectedClickText);
    removeChips(selectedClickText);
    mainSearch();
  });

  deselectCross.addEventListener("click", () => {
    removeApplianceFromDropdown(selectedClickText);
    removeChips(selectedClickText);
    mainSearch();
  });
}
function selectUtensilItem(selectedClick, selectedClickText) {
  // changer la div sur le dropdown
  const selectedUtensilsDiv = document.getElementById("selected-utensils");

  selectedClick.removeEventListener("click", handleUtensilClick);

  selectedClick.classList.replace("item-dropdown", "selected-item");
  const deselectCross = document.createElement("img");
  deselectCross.setAttribute("src", "assets/circle-xmark-solid.svg");

  const selectedUtensilDiv = document.createElement("div");

  selectedUtensilDiv.classList.add("selected-utensil-on-dropdown-container");
  selectedUtensilDiv.classList.add("selected-item-on-dropdown-container");

  selectedUtensilDiv.appendChild(selectedClick);
  selectedUtensilDiv.appendChild(deselectCross);
  selectedUtensilsDiv.appendChild(selectedUtensilDiv);

  // créer la chip

  const selectedChipsTemplate = document.getElementById("chips-template");
  const selectedChipsTemplateClone =
    selectedChipsTemplate.content.cloneNode(true).firstElementChild;
  const chipsContainer = document.querySelector(".chips-container");

  chipsContainer.appendChild(selectedChipsTemplateClone);

  selectedChipsTemplateClone.querySelector(".chips-text").innerText =
    selectedClick.textContent;

  selectedChipsTemplateClone.firstElementChild.addEventListener("click", () => {
    removeUtensilFromDropdown(selectedClickText);
    removeChips(selectedClickText);
    mainSearch();
  });

  deselectCross.addEventListener("click", () => {
    removeUtensilFromDropdown(selectedClickText);
    removeChips(selectedClickText);
    mainSearch();
  });
}

function removeIngredientFromDropdown(label) {
  const c = document.getElementById("selected-ingredients");
  for (let i = 0; i < c.children.length; i++) {
    if (c.children[i].textContent == label) {
      c.removeChild(c.children[i]);
      break;
    }
  }
}

function removeApplianceFromDropdown(label) {
  const c = document.getElementById("selected-appliances");
  for (let i = 0; i < c.children.length; i++) {
    if (c.children[i].textContent == label) {
      c.removeChild(c.children[i]);
      break;
    }
  }
}

function removeUtensilFromDropdown(label) {
  const c = document.getElementById("selected-utensils");
  for (let i = 0; i < c.children.length; i++) {
    if (c.children[i].textContent == label) {
      c.removeChild(c.children[i]);
      break;
    }
  }
}

function removeChips(label) {
  const c = document.getElementById("chips-container-id");
  for (let i = 0; i < c.children.length; i++) {
    console.log("é");

    if (c.children[i].textContent.trim() == label) {
      c.removeChild(c.children[i]);
      break;
    }
  }
}

function clearInput(index) {
  const input = document.querySelectorAll(".dropdown-search")[index];
  input.value = "";
  input.focus();
  filterList(input, index);
}

function displayRecipes(recipeList) {
  const recipeListLengthDisplay = document.querySelector(".recipe-length");

  recipeListLengthDisplay.innerText = recipeList.length;

  const recipeTemplate = document.getElementById("recipe-card-template");
  const recipeSection = document.querySelector(".recipe-section");
  recipeSection.innerHTML = "";

  for (let i = 0; i < recipeList.length; i++) {
    const recipeTemplateClone = document.importNode(
      recipeTemplate.content,
      true
    );

    recipeTemplateClone.firstElementChild.firstElementChild.firstElementChild.src =
      "assets/recipes_img/" + recipeList[i].image;

    recipeTemplateClone.firstElementChild.firstElementChild.nextElementSibling.innerHTML =
      "<p>" + recipeList[i].time + "mn</p>";

    recipeTemplateClone.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.innerText =
      recipeList[i].name;

    recipeTemplateClone.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.innerText =
      recipeList[i].description;

    for (let j = 0; j < recipeList[i].ingredients.length; j++) {
      const ingredientsItemsContainer = recipeTemplateClone.querySelectorAll(
        ".ingredients-items-container"
      );

      ingredientsItemsContainer[j].firstElementChild.innerText =
        recipeList[i].ingredients[j].ingredient;

      if (typeof recipeList[i].ingredients[j].quantity !== "undefined") {
        if (typeof recipeList[i].ingredients[j].unit !== "undefined") {
          ingredientsItemsContainer[
            j
          ].firstElementChild.nextElementSibling.innerText =
            recipeList[i].ingredients[j].quantity +
            " " +
            recipeList[i].ingredients[j].unit;
        } else {
          ingredientsItemsContainer[
            j
          ].firstElementChild.nextElementSibling.innerText =
            recipeList[i].ingredients[j].quantity;
        }
      }
    }

    recipeSection.appendChild(recipeTemplateClone);
  }
}

function displayNoRecipes() {
  const recipeListLengthDisplay = document.querySelector(".recipe-length");

  recipeListLengthDisplay.innerText = "0";
  const recipeSection = document.querySelector(".recipe-section");
  recipeSection.innerHTML = "";
  console.log("rieng");
}
