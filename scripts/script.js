window.addEventListener("load", () => {
  setEvents();
  ingredientSearch();
});

let appliances = [];
let utensils = [];
let ingredients = [];

function setEvents() {
  // MAIN SEARCH BAR EVENTS
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;
  searchInput.addEventListener("input", mainSearch);

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

  // DROPDOWN EVENTS
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  for (let i = 0; i < dropdownButtons.length; i++) {
    const dropdownButton = dropdownButtons[i];
    const dropdownContent = dropdownButton.nextElementSibling;

    dropdownButton.addEventListener("click", () =>
      dropdownShow(dropdownButton)
    );

    const dropdownItems = dropdownContent.querySelectorAll(".item-dropdown");

    for (let j = 0; j < dropdownItems.length; j++) {
      const dropdownItem = dropdownItems[j];
      dropdownItem.addEventListener("click", function (event) {
        saveSelect(event);
      });
    }
  }

  const dropdownSearchInputs = document.querySelectorAll(".dropdown-search");

  for (let i = 0; i < dropdownSearchInputs.length; i++) {
    const dropdownSearchInput = dropdownSearchInputs[i];
    dropdownSearchInput.addEventListener("keyup", () => {
      filterList(dropdownSearchInput, i);
    });
  }

  const clearButtons = document.querySelectorAll(".clear-button");

  for (let i = 0; i < clearButtons.length; i++) {
    const clearButton = clearButtons[i];
    clearButton.addEventListener("click", () => clearInput(i));
  }
}

function mainSearch() {
  const searchButton = document.getElementById("header-search-button");
  const searchInput = searchButton.previousElementSibling.firstElementChild;

  let recipeList = [...recipes];
  // console.log(recipeList);

  recipeList = filterBySearch(recipeList, searchInput);
  if (recipeList.length !== 0) {
    displayRecipes(recipeList);
  } else {
    displayNoRecipes();
  }
  // recipeList = filterByIngredients(recipeList);
  // recipeList = filterByUtensils(recipeList);
  // recipeList = filterByAppliances(recipeList);

  // 0;

  // ingredients = getIngredients(recipeList);
  // utensils = getUtensils(recipeList);
  // appliances = getAppliances(recipeList);

  let applianceCount = 0;
  let utensilCount = 0;
  let ingredientCount = 0;

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    appliances[applianceCount] = recipe.appliance;
    applianceCount++;

    for (let j = 0; j < recipe.ustensils.length; j++) {
      utensils[utensilCount] = recipe.ustensils[j];
      utensilCount++;
    }

    for (let k = 0; k < recipe.ingredients.length; k++) {
      ingredients[ingredientCount] = recipe.ingredients[k].ingredient;
      ingredientCount++;
    }
  }

  function filterBySearch(recipeList, searchInput) {
    const r = [];
    const searchValue = searchInput.value.toLowerCase();
    for (let i = 0; i < recipeList.length; i++) {
      const recipe = recipeList[i];
      let ingredientName;
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j];
        ingredientName = ingredient.ingredient;
      }

      if (
        recipeList[i].name.toLowerCase().includes(searchValue) ||
        recipeList[i].description.toLowerCase().includes(searchValue) ||
        ingredientName.toLowerCase().includes(searchValue)
      ) {
        const recette = recipeList[i];

        r.push(recette);
      }
    }
    return r;
  }
}

function ingredientSearch() {
  let totalIngredientNames = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeIngredients = recipe.ingredients;

    let ingredientNames = new Array(recipeIngredients.length);
    for (let k = 0; k < recipeIngredients.length; k++) {
      ingredientNames[k] = recipeIngredients[k].ingredient;
    }
    totalIngredientNames[i] = ingredientNames;
    // for (let j = 0; j < recipeIngredients.length; j++) {
    //   const recipeIngredient = recipeIngredients[j]["ingredient"];
    //   if (recipeIngredient.includes(searchInput.value)) {
    //     console.log(recipeIngredient);
    //   }
    // }
  }
  // console.log(totalIngredientNames);

  let flattenedIngredientNames = [];
  for (let l = 0; l < totalIngredientNames.length; l++) {
    const currentArray = totalIngredientNames[l];

    for (let m = 0; m < currentArray.length; m++) {
      flattenedIngredientNames[flattenedIngredientNames.length] =
        currentArray[m];
    }
  }
  const uniqueIngredientNames = [...new Set(flattenedIngredientNames)];
  // console.log(uniqueIngredientNames);
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

function dropdownShow(dropdownButton) {
  dropdownButton.nextElementSibling.classList.toggle("show");
  dropdownButton.classList.toggle("border-radius-bottom");
}

function saveSelect(event) {
  const selectedClickText = event.target.innerText;

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
  const recipeSection = document.querySelector(".recipe-section");
  recipeSection.innerHTML = "";
  console.log("rieng");
}
