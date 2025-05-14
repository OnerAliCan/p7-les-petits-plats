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
    Object.values(dropdownContents).forEach((dropdownContent, i) => {
      if (
        !dropdownContent.contains(event.target) &&
        !dropdownButtons[i].contains(event.target)
      ) {
        dropdownContent.classList.remove("show");
      }
    });
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
    displayNoRecipes(recipeList, searchInput.value);
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

  recipeList.forEach(recipe => {
    let ingredientName;

    if (
      recipe.name.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue)
    ) {
      r.push(recipe);
      return;
    }

    recipe.ingredients.forEach(ingredient => {
      ingredientName = ingredient.ingredient;

      if (ingredientName.toLowerCase().includes(searchValue)) {
        r.push(recipe);
        return;
      }
    });
  });
  return r;
}
function getInitialIngredientsList() {
  let recipeList = [...recipes];
  const ingredientArray = [];

  recipeList.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      ingredientArray.push(ingredient.ingredient);
    });
  });

  const finalIngredientArray = [...new Set(ingredientArray)];

  return finalIngredientArray;
}

function getInitialAppliancesList() {
  let recipeList = [...recipes];
  const appliancesArray = [];

  recipeList.forEach(recipe => {
    appliancesArray.push(recipe.appliance);
  });
  const finalAppliancesArray = [...new Set(appliancesArray)];

  return finalAppliancesArray;
}

function getInitialUtensilsList() {
  let recipeList = [...recipes];
  const utensilsArray = [];
  recipeList.forEach(recipe => {
    recipe.ustensils.forEach(utensil => {
      utensil = utensil.toLowerCase();
      utensil =
        utensil.charAt(0).toUpperCase() + utensil.slice(1).toLowerCase();
      utensilsArray.push(utensil);
    });
  });

  const uniqueUtensilsArray = [...new Set(utensilsArray)];

  return uniqueUtensilsArray;
}

function updateIngredientsList(recipeList) {
  let updatedIngredientArray = [];

  recipeList.forEach(updatedRecipes => {
    updatedRecipes.ingredients.forEach(updatedRecipe => {
      updatedIngredientArray.push(updatedRecipe.ingredient);
    });
  });

  const finalUpdatedUniqueIngredients = [...new Set(updatedIngredientArray)];

  return finalUpdatedUniqueIngredients;
}

function updateAppliancesList(recipeList) {
  let updatedApplianceArray = [];

  recipeList.forEach(updatedRecipes => {
    updatedApplianceArray.push(updatedRecipes.appliance);
  });

  const updatedUniqueAppliances = [...new Set(updatedApplianceArray)];

  return updatedUniqueAppliances;
}

function updateUtensilsList(recipeList) {
  let updatedUtensilArray = [];

  recipeList.forEach(updatedRecipes => {
    updatedRecipes.ustensils.forEach(utensil => {
      utensil =
        utensil.charAt(0).toUpperCase() + utensil.slice(1).toLowerCase();
      updatedUtensilArray.push(utensil);
    });
  });

  const updatedUniqueUtensils = [...new Set(updatedUtensilArray)];

  return updatedUniqueUtensils;
}

function filterByIngredients(recipeList) {
  let r = [];
  const children = document.getElementById("selected-ingredients").children;

  const selectedIngredientsList = [];
  Object.values(children).forEach(child => {
    selectedIngredientsList.push(child.textContent.toLowerCase());
  });

  recipeList.forEach(recipe => {
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
  });
  return r;
}

function filterByAppliances(recipeList) {
  let r = [];
  const children = document.getElementById("selected-appliances").children;

  const selectedAppliancesList = [];
  Object.values(children).forEach(child => {
    selectedAppliancesList.push(child.textContent.toLowerCase());
  });

  recipeList.forEach(recipe => {
    const allAppliancesIncluded = selectedAppliancesList.every(
      selectedAppliance => {
        return recipe.appliance.toLowerCase() === selectedAppliance;
      }
    );

    if (allAppliancesIncluded) {
      r.push(recipe);
    }
  });
  return r;
}

function filterByUtensils(recipeList) {
  let r = [];
  const children = document.getElementById("selected-utensils").children;

  const selectedUtensilsList = [];
  Object.values(children).forEach(child => {
    selectedUtensilsList.push(child.textContent.toLowerCase());
  });

  recipeList.forEach(recipe => {
    const allUtensilsIncluded = selectedUtensilsList.every(selectedUtensil => {
      return recipe.ustensils.some(utensil => {
        return utensil.toLowerCase() === selectedUtensil;
      });
    });

    if (allUtensilsIncluded) {
      r.push(recipe);
    }
  });
  return r;
}

function filterList(dropdownSearchInput) {
  const filter = dropdownSearchInput.value.toUpperCase();
  const a = document.querySelectorAll(".item-dropdown");

  Object.values(a).forEach(aElement => {
    let txtValue = aElement.textContent || aElement.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      aElement.style.display = "";
    } else {
      aElement.style.display = "none";
    }
  });
}

function ingredientsDropdownFill(uniqueIngredients) {
  const children = document.getElementById("selected-ingredients").children;
  const selectedIngredients = [];

  Object.values(children).forEach(child => {
    selectedIngredients.push(child.textContent);
  });

  const filteredUniqueElementNames = uniqueIngredients.filter(
    ingredient => !selectedIngredients.includes(ingredient)
  );

  const ingredientsDropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const ingredientsDropdownContent = document.getElementById(
    "dropdown-ingredients-container"
  );

  let ingredientsDropdownItemClone;
  ingredientsDropdownContent.innerHTML = "";

  filteredUniqueElementNames.forEach(uniqueElementName => {
    ingredientsDropdownItemClone = document.importNode(
      ingredientsDropdownItemTemplate.content,
      true
    ).firstElementChild;
    ingredientsDropdownItemClone.innerText = uniqueElementName;

    ingredientsDropdownContent.appendChild(ingredientsDropdownItemClone);
  });

  const ingredientsDropdownItems =
    ingredientsDropdownContent.querySelectorAll(".item-dropdown");

  Object.values(ingredientsDropdownItems).forEach(dropdownItem => {
    dropdownItem.addEventListener("click", handleIngredientClick);
  });

  const ingredientsDropdownSearchInputs =
    document.querySelectorAll(".dropdown-search");

  Object.values(ingredientsDropdownSearchInputs).forEach(
    ingredientsDropdownSearchInput => {
      ingredientsDropdownSearchInput.addEventListener("input", () => {
        filterList(ingredientsDropdownSearchInput);
      });
    }
  );

  const clearButtons = document.querySelectorAll(".clear-button");

  Object.values(clearButtons).forEach((clearButton, m) => {
    clearButton.addEventListener("click", () => clearInput(m));
  });

  return selectedIngredients;
}

function appliancesDropdownFill(appliances) {
  const children = document.getElementById("selected-appliances").children;
  const selectedAppliances = [];

  Object.values(children).forEach(child => {
    selectedAppliances.push(child.textContent);
  });

  const filteredUniqueElementNames = appliances.filter(
    appliance => !selectedAppliances.includes(appliance)
  );

  const appliancesDropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const appliancesDropdownContent = document.getElementById(
    "dropdown-appliances-container"
  );

  let appliancesDropdownItemClone;

  appliancesDropdownContent.innerHTML = "";

  filteredUniqueElementNames.forEach(uniqueElementName => {
    appliancesDropdownItemClone = document.importNode(
      appliancesDropdownItemTemplate.content,
      true
    ).firstElementChild;
    appliancesDropdownItemClone.innerText = uniqueElementName;

    appliancesDropdownContent.appendChild(appliancesDropdownItemClone);
  });

  const appliancesDropdownItems =
    appliancesDropdownContent.querySelectorAll(".item-dropdown");

  Object.values(appliancesDropdownItems).forEach(dropdownItem => {
    dropdownItem.addEventListener("click", handleApplianceClick);
  });

  const appliancesDropdownSearchInputs =
    document.querySelectorAll(".dropdown-search");

  Object.values(appliancesDropdownSearchInputs).forEach(
    appliancesDropdownSearchInput => {
      appliancesDropdownSearchInput.addEventListener("input", () => {
        filterList(appliancesDropdownSearchInput);
      });
    }
  );

  const clearButtons = document.querySelectorAll(".clear-button");

  Object.values(clearButtons).forEach((clearButton, i) => {
    clearButton.addEventListener("click", () => clearInput(i));
  });

  return selectedAppliances;
}

function utensilsDropdownFill(utensils) {
  const children = document.getElementById("selected-utensils").children;
  const selectedUtensils = [];

  Object.values(children).forEach(child => {
    selectedUtensils.push(child.textContent);
  });

  const filteredUniqueElementNames = utensils.filter(
    utensil => !selectedUtensils.includes(utensil)
  );

  const utensilsDropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const utensilsDropdownContent = document.getElementById(
    "dropdown-utensils-container"
  );

  let utensilsDropdownItemClone;

  utensilsDropdownContent.innerHTML = "";

  Object.values(filteredUniqueElementNames).forEach(uniqueElementName => {
    utensilsDropdownItemClone = document.importNode(
      utensilsDropdownItemTemplate.content,
      true
    ).firstElementChild;
    utensilsDropdownItemClone.innerText = uniqueElementName;

    utensilsDropdownContent.appendChild(utensilsDropdownItemClone);
  });

  const utensilsDropdownItems =
    utensilsDropdownContent.querySelectorAll(".item-dropdown");

  Object.values(utensilsDropdownItems).forEach(dropdownItem => {
    dropdownItem.addEventListener("click", handleUtensilClick);
  });

  const utensilsDropdownSearchInputs =
    document.querySelectorAll(".dropdown-search");

  Object.values(utensilsDropdownSearchInputs).forEach(
    utensilsDropdownSearchInput => {
      utensilsDropdownSearchInput.addEventListener("input", () => {
        filterList(utensilsDropdownSearchInput);
      });
    }
  );

  const clearButtons = document.querySelectorAll(".clear-button");

  Object.values(clearButtons).forEach((clearButton, i) => {
    clearButton.addEventListener("click", () => clearInput(i));
  });

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

  selectedChipsTemplateClone.firstElementChild.nextElementSibling.addEventListener("click", () => {
    removeIngredientFromDropdown(selectedClickText);
    removeChips(selectedClickText);
    mainSearch();
  });

  deselectCross.addEventListener("click", () => {
    removeIngredientFromDropdown(selectedClickText);

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

  selectedChipsTemplateClone.firstElementChild.nextElementSibling.addEventListener("click", () => {
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

  selectedChipsTemplateClone.firstElementChild.nextElementSibling.addEventListener("click", () => {
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

  Object.values(c.children).forEach(child => {
    if (child.textContent == label) {
      c.removeChild(child);
      return;
    }
  });
}

function removeApplianceFromDropdown(label) {
  const c = document.getElementById("selected-appliances");

  Object.values(c.children).forEach(child => {
    if (child.textContent == label) {
      c.removeChild(child);
      return;
    }
  });
}

function removeUtensilFromDropdown(label) {
  const c = document.getElementById("selected-utensils");
  Object.values(c.children).forEach(child => {
    if (child.textContent == label) {
      c.removeChild(child);
      return;
    }
  });
}

function removeChips(label) {
  const c = document.getElementById("chips-container-id");

  Object.values(c.children).forEach(child => {
    if (child.textContent.trim() == label) {
      c.removeChild(child);
      return;
    }
  });
}

function clearInput(index) {
  const input = document.querySelectorAll(".dropdown-search")[index];
  input.value = "";
  input.focus();
  filterList(input);
}

function displayRecipes(recipeList) {
  const recipeListLengthDisplay = document.querySelector(".recipe-length");

  recipeListLengthDisplay.innerText = recipeList.length;

  const recipeTemplate = document.getElementById("recipe-card-template");
  const recipeSection = document.querySelector(".recipe-section");
  recipeSection.innerHTML = "";

  Object.values(recipeList).forEach(recipe => {
    const recipeTemplateClone = document.importNode(
      recipeTemplate.content,
      true
    );

    recipeTemplateClone.firstElementChild.firstElementChild.firstElementChild.src =
      "assets/recipes_img/" + recipe.image;

    recipeTemplateClone.firstElementChild.firstElementChild.nextElementSibling.innerHTML =
      "<p>" + recipe.time + "mn</p>";

    recipeTemplateClone.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.innerText =
      recipe.name;

    recipeTemplateClone.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.innerText =
      recipe.description;

    const ingredientsItemsContainer = recipeTemplateClone.querySelectorAll(
      ".ingredients-items-container"
    );

    Object.values(recipe.ingredients).forEach((ingredient, i) => {
      const ingredientContainer = ingredientsItemsContainer[i];

      ingredientContainer.firstElementChild.textContent = ingredient.ingredient;

      if (typeof ingredient.quantity !== "undefined") {
        if (typeof ingredient.unit !== "undefined") {
          ingredientContainer.firstElementChild.nextElementSibling.innerText =
            ingredient.quantity + " " + ingredient.unit;
        } else {
          ingredientContainer.firstElementChild.nextElementSibling.innerText =
            ingredient.quantity;
        }
      }
    });

    recipeSection.appendChild(recipeTemplateClone);
  });
}

function displayNoRecipes(recipeList, searchInputValue) {
  const recipeListLengthDisplay = document.querySelector(".recipe-length");

  recipeListLengthDisplay.innerText = "0";
  const recipeSection = document.querySelector(".recipe-section");

  const noRecipes = document.createElement("div");
  noRecipes.textContent =
    "Aucun élément ne contient " +
    searchInputValue +
    ",  vous pouvez chercher « tarte aux pommes », « poisson » , etc";
  recipeSection.innerHTML = "";
  recipeSection.appendChild(noRecipes);
}
