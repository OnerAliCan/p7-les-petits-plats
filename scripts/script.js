window.addEventListener("load", () => {
  let recipeList = [...recipes];

  setEvents();
  displayRecipes(recipeList);
});

// let appliances = [];
// let utensils = [];
// let ingredients = [];

function setEvents() {
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;
  let recipeList = [...recipes];
  let uniqueIngredients = [];
  const dropdownButton = document.getElementById(
    "ingredients-dropdown-button"
  ).firstElementChild;

  uniqueIngredients = getInitialIngredientsList(recipeList);

  const dropdownContent = dropdownButton.nextElementSibling;

  searchInput.addEventListener("focus", function () {
    dropdownContent.classList.remove("show");
  });

  searchInput.addEventListener("input", () => {
    recipeList = [...recipes];
    recipeList = mainSearch(recipeList);
    uniqueIngredients = updateIngredientsList(recipeList);
    resetDropdownEvent();
  });
  let selectedIngredients = [];

  function handleDropdownClick() {
    ingredientDropdownFill(recipeList, selectedIngredients, uniqueIngredients);
    ingredientDropdownToggle(dropdownContent);
  }

  // dropdownButton.addEventListener("click", handleDropdownClick);

  function resetDropdownEvent() {
    dropdownButton.removeEventListener("click", handleDropdownClick);
    dropdownButton.addEventListener("click", handleDropdownClick);
  }

  resetDropdownEvent();
}

function mainSearch(recipeList, selectedClickText) {
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;
  const r = [];

  if (searchInput.value) {
    recipeList = filterBySearch(r, recipeList, searchInput);
  }

  // recipeList = filterByIngredients(
  //   r,
  //   selectedIngredients,
  //   recipeList,
  //   selectedClickText
  // );

  if (recipeList.length !== 0) {
    displayRecipes(recipeList);
  } else {
    displayNoRecipes();
  }

  return recipeList;
}
function filterBySearch(r, recipeList, searchInput) {
  const searchValue = searchInput.value.toLowerCase();
  const searchValueArray = [];
  searchValueArray.shift();
  searchValueArray.push(searchValue);
  const searchValueArrayFirstValue = searchValueArray[0];
  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];
    let ingredientName;
    let ingredientFound = false;

    if (
      recipeList[i].name.toLowerCase().includes(searchValueArrayFirstValue) ||
      recipeList[i].description
        .toLowerCase()
        .includes(searchValueArrayFirstValue)
    ) {
      r.push(recipe);
      continue;
    }

    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientName = recipe.ingredients[j].ingredient;

      if (ingredientName.toLowerCase().includes(searchValueArrayFirstValue)) {
        ingredientFound = true;
        break;
      }
    }

    if (ingredientFound) {
      r.push(recipe);
    }
  }
  return r;
}

function getInitialIngredientsList(recipeList) {
  const ingredientArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientArray.push(recipe.ingredients[j].ingredient);
    }
  }
  const uniqueIngredients = [...new Set(ingredientArray)];
  return uniqueIngredients;
}

function updateIngredientsList(recipeList) {
  const updatedIngredientArray = [];

  for (let i = 0; i < recipeList.length; i++) {
    const updatedRecipe = recipeList[i];
    for (let j = 0; j < updatedRecipe.ingredients.length; j++) {
      updatedIngredientArray.push(updatedRecipe.ingredients[j].ingredient);
    }
  }
  const updatedUniqueIngredients = [...new Set(updatedIngredientArray)];

  return updatedUniqueIngredients;
}

function filterByIngredients(
  r,
  selectedIngredients,
  recipeList,
  selectedClickText
) {
  selectedIngredients.push(selectedClickText);

  r = recipeList.filter(recipe =>
    selectedIngredients.every(selected =>
      recipe.ingredients.some(ingredient => ingredient.ingredient === selected)
    )
  );
  console.log(r);
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

function ingredientDropdownFill(
  recipeList,
  selectedIngredients,
  uniqueIngredients
) {
  const filteredUniqueElementNames = uniqueIngredients.filter(
    ingredient => !selectedIngredients.includes(ingredient)
  );

  let uniqueElementName;
  const dropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const dropdownIngredientsContent = document.getElementById(
    "dropdown-ingredients-container"
  );

  let dropdownItemClone;
  dropdownIngredientsContent.innerHTML = "";

  for (let j = 0; j < filteredUniqueElementNames.length; j++) {
    uniqueElementName = filteredUniqueElementNames[j];
    dropdownItemClone = document.importNode(
      dropdownItemTemplate.content,
      true
    ).firstElementChild;
    dropdownItemClone.innerText = uniqueElementName;

    dropdownIngredientsContent.appendChild(dropdownItemClone);
  }

  const dropdownItems =
    dropdownIngredientsContent.querySelectorAll(".item-dropdown");
  for (let j = 0; j < dropdownItems.length; j++) {
    const dropdownItem = dropdownItems[j];
    dropdownItem.addEventListener("click", function (event) {
      const selectedClickText = event.target.textContent;
      createChips(selectedClickText);
      selectedIngredients.push(selectedClickText);

      recipeList = mainSearch(recipeList, selectedClickText);
      ingredientChangeDiv(dropdownItem);
      ingredientDropdownFill(
        recipeList,
        selectedIngredients,
        uniqueIngredients
      );
    });
  }

  const dropdownSearchInputs = document.querySelectorAll(".dropdown-search");

  for (let i = 0; i < dropdownSearchInputs.length; i++) {
    const dropdownSearchInput = dropdownSearchInputs[i];
    dropdownSearchInput.addEventListener("input", () => {
      filterList(dropdownSearchInput, i);
    });
  }

  const clearButtons = document.querySelectorAll(".clear-button");

  for (let i = 0; i < clearButtons.length; i++) {
    const clearButton = clearButtons[i];
    clearButton.addEventListener("click", () => clearInput(i));
  }
  return selectedIngredients;
}

function ingredientDropdownToggle(dropdownContent) {
  if (dropdownContent.classList.contains("show")) {
    dropdownContent.classList.remove("show");
  } else {
    dropdownContent.classList.add("show");
  }
}

function ingredientChangeDiv(selectedClick) {
  const selectedIngredients = document.getElementById("selected-ingredients");
  const baseIngredientsList = document.getElementById(
    "dropdown-ingredients-container"
  );
  selectedClick.classList.replace("item-dropdown", "selected-ingredient");

  baseIngredientsList.removeChild;
  selectedIngredients.appendChild(selectedClick);
}

function createChips(selectedClickText) {
  const selectedItemTemplate = document.getElementById(
    "selected-item-template"
  );
  const selectedItemTemplateClone = document.importNode(
    selectedItemTemplate.content,
    true
  );
  selectedItemTemplateClone.querySelector(".selected-item-text").innerText =
    selectedClickText;

  const selectedItem = document.querySelector(".selected-item-container");

  selectedItem.appendChild(selectedItemTemplateClone);

  const selectedItemClearButtons = document.querySelectorAll(
    ".selected-item-clear-button"
  );

  for (let i = 0; i < selectedItemClearButtons.length; i++) {
    const selectedItemClearButton = selectedItemClearButtons[i];

    selectedItemClearButton.addEventListener("click", function () {
      this.parentElement.remove(this);
    });
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
