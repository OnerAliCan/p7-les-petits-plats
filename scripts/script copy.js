window.addEventListener("load", () => {
  let recipeList = [...recipes];

  setEvents();
  displayRecipes(recipeList);
});

let appliances = [];
let utensils = [];
let ingredients = [];

function setEvents() {
  // MAIN SEARCH BAR EVENTS
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;
  let initialRecipeList = [...recipes];
  let uniqueIngredients = [];
  // let updatedRecipeList = [];
  const dropdownButton = document.getElementById(
    "ingredients-dropdown-button"
  ).firstElementChild;

  uniqueIngredients = getInitialIngredientsList(initialRecipeList);

  const dropdownContent = dropdownButton.nextElementSibling;

  searchInput.addEventListener("focus", function () {
    dropdownContent.classList.remove("show");
  });

  searchInput.addEventListener("input", () => {
    let { recipeList: updatedRecipeList } = mainSearch(initialRecipeList);

    uniqueIngredients = updateIngredientsList(
      dropdownButton,
      updatedRecipeList
    );
  });

  function handleDropdownClick() {
    ingredientDropdownShow(uniqueIngredients);
  }

  dropdownButton.addEventListener("click", handleDropdownClick);

  function resetDropdownEvent() {
    dropdownButton.removeEventListener("click", handleDropdownClick);
    dropdownButton.addEventListener("click", handleDropdownClick);
  }
  resetDropdownEvent();

  // dropdownButton.addEventListener("click", () => {
  //   console.log(uniqueIngredients.length);
  // });

  // result = filterByAppliances(recipeList);

  // searchInput.addEventListener("input", function (event) {
  // if (event.key === "Enter") {
  //   for (let i = 0; i < recipes.length; i++) {
  //     if (recipes[i] === searchInput.value) {
  //       console.log(recipes[i]);
  //     }
  //   }
  // }
  //   console.log("hello");
  // });
}

function mainSearch(recipeList) {
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;
  const r = [];

  recipeList = filterBySearch(r, recipeList, searchInput);
  if (r.length !== 0) {
    displayRecipes(r);
  } else {
    displayNoRecipes();
  }
  // filterByIngredients(recipeList);
  // const uniqueIngredients = getInitialIngredientsList(recipeList);
  // console.log(uniqueIngredients);

  return { recipeList };
  // ingredients = getIngredients(recipeList);
  // utensils = getUtensils(recipeList);
  // appliances = getAppliances(recipeList);

  // let applianceCount = 0;
  // let utensilCount = 0;
  // let ingredientCount = 0;

  // for (let i = 0; i < recipes.length; i++) {
  //   const recipe = recipes[i];

  //   appliances[applianceCount] = recipe.appliance;
  //   applianceCount++;

  //   for (let j = 0; j < recipe.ustensils.length; j++) {
  //     utensils[utensilCount] = recipe.ustensils[j];
  //     utensilCount++;
  //   }

  //   for (let k = 0; k < recipe.ingredients.length; k++) {
  //     ingredients[ingredientCount] = recipe.ingredients[k].ingredient;
  //     ingredientCount++;
  //   }
  // }
}

function filterBySearch(r, recipeList, searchInput) {
  const searchValue = searchInput.value.toLowerCase();
  const searchValueArray = [];
  searchValueArray.shift();
  searchValueArray.push(searchValue);
  const searchValueArrayFirstValue = searchValueArray[0];
  console.log(searchValueArrayFirstValue);
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

function updateIngredientsList(dropdownButton, updatedRecipeList) {
  const updatedIngredientArray = [];

  for (let i = 0; i < updatedRecipeList.length; i++) {
    const updatedRecipe = updatedRecipeList[i];
    for (let j = 0; j < updatedRecipe.ingredients.length; j++) {
      updatedIngredientArray.push(updatedRecipe.ingredients[j].ingredient);
    }
  }
  const updatedUniqueIngredients = [...new Set(updatedIngredientArray)];

  return updatedUniqueIngredients;
}

// function filterByIngredients(recipeList) {
//   let totalIngredientNames = [];

//   for (let i = 0; i < recipeList.length; i++) {
//     const recipe = recipeList[i];
//     const recipeIngredients = recipe.ingredients;

//     // console.log(recipeIngredients);

//     let ingredientNames = new Array(recipeIngredients.length);
//     for (let k = 0; k < recipeIngredients.length; k++) {
//       ingredientNames[k] = recipeIngredients[k].ingredient;
//     }
//     totalIngredientNames[i] = ingredientNames;
//   }

//   let flattenedIngredientNames = [];
//   for (let l = 0; l < totalIngredientNames.length; l++) {
//     const currentArray = totalIngredientNames[l];

//     for (let m = 0; m < currentArray.length; m++) {
//       flattenedIngredientNames[flattenedIngredientNames.length] =
//         currentArray[m];
//     }
//   }
//   const uniqueIngredientNames = [...new Set(flattenedIngredientNames)];
//   return { recipeList, uniqueIngredientNames };
// }

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

function ingredientDropdownShow(uniqueElementNames) {
  let uniqueElementName;
  const dropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const dropdownIngredientsContent = document.getElementById(
    "dropdown-ingredients-container"
  );

  const dropdownContent = document.getElementById(
    "dropdown-ingredients-content"
  );

  let dropdownItemClone;
  dropdownIngredientsContent.innerHTML = "";

  for (let j = 0; j < uniqueElementNames.length; j++) {
    uniqueElementName = uniqueElementNames[j];
    dropdownItemClone = document.importNode(
      dropdownItemTemplate.content,
      true
    ).firstElementChild;
    dropdownItemClone.innerText = "";

    dropdownItemClone.innerText = uniqueElementName;

    dropdownIngredientsContent.appendChild(dropdownItemClone);
  }

  if (dropdownContent.classList.contains("show")) {
    dropdownContent.classList.remove("show");
  } else {
    dropdownContent.classList.add("show");
  }

  // dropdownButton.classList.toggle("border-radius-bottom");
  // console.log(uniqueElementNames);
  const dropdownItems =
    dropdownIngredientsContent.querySelectorAll(".item-dropdown");
  for (let j = 0; j < dropdownItems.length; j++) {
    const dropdownItem = dropdownItems[j];
    const dropdownItemText = dropdownItem.textContent;

    dropdownItem.addEventListener("click", function (event) {
      // dropdownIngredientsContent.removeChild(dropdownItemClone);

      const selectedClick = event.target;
      const selectedClickText = event.target.textContent;
      createChips(selectedClickText);
      ingredientChangeDiv(selectedClick);
      // removefromIngredients();
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
}

function ingredientChangeDiv(selectedClick) {
  // console.log(selectedClickText);
  const selectedIngredients = document.getElementById("selected-ingredients");
  const baseIngredientsList = document.getElementById(
    "dropdown-ingredients-container"
  );

  // console.log(baseIngredientsList);
  // baseIngredientsList.removeChild(selectedClick);
  selectedIngredients.appendChild(selectedClick);
  selectedClick.classList.remove("item-dropdown");
  selectedClick.classList.add("selected-item");
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

  // console.log(recipeListLengthDisplay);

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
  // console.log("rieng");
}
