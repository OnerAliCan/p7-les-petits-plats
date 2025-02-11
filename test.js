function ingredientDropdownShow(uniqueElementNames) {
  const dropdownButton = document.getElementById(
    "ingredients-dropdown-button"
  ).firstElementChild;

  let uniqueElementName;
  const dropdownItemTemplate = document.getElementById(
    "item-dropdown-template"
  );
  const dropdownIngredientsContent = document.getElementById(
    "dropdown-ingredients-container"
  );
  console.log(uniqueElementNames.length);

  dropdownButton.addEventListener("click", () => {
    console.log(uniqueElementNames.length);
    let dropdownItemClone;
    for (let j = 0; j < uniqueElementNames.length; j++) {
      uniqueElementName = uniqueElementNames[j];
      dropdownItemClone = document.importNode(
        dropdownItemTemplate.content,
        true
      ).firstElementChild;
      dropdownItemClone.innerText = uniqueElementName;

      dropdownIngredientsContent.appendChild(dropdownItemClone);
      console.log(dropdownItemClone);
    }

    dropdownIngredientsContent.classList.toggle("show");
  });

  //   dropdownButton.classList.toggle("border-radius-bottom");
  // const dropdownItems = dropdownIngredientsContent.querySelectorAll(".item-dropdown");
  // for (let j = 0; j < dropdownItems.length; j++) {
  //   const dropdownItem = dropdownItems[j];
  //   dropdownItem.addEventListener("click", function (event) {
  //     saveSelect(event);
  //   });
  // }

  // );
  // }

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
