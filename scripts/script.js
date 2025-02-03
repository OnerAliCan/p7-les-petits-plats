window.addEventListener("load", () => {
  setEvents();
});
console.log(recipes[0]);

function setEvents() {
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
      dropdownItem.addEventListener("click", () => saveSelect(dropdownItem));
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

function saveSelect(dropdownItem) {
  console.log("yo ", dropdownItem);

  console.log(this.innerText);

  let selectedElementText =
    (dropdownItem.parentElement.parentElement.parentElement.parentElement.nextElementSibling.childNodes[1].childNodes[1].innerText =
      dropdownItem.innerText);

  const selectedItem = document.querySelector(".selected-item");

  const clonedSelectedItem = selectedItem.cloneNode(true);

  clonedSelectedItem.firstChild.innerText = selectedElementText;
  clonedSelectedItem.classList.add("filter-display");

  selectedItem.parentElement.appendChild(clonedSelectedItem);

  const selectedItemClearButtons = document.querySelectorAll(
    ".selected-item-clear-button"
  );

  for (let i = 0; i < selectedItemClearButtons.length; i++) {
    const selectedItemClearButton = selectedItemClearButtons[i];
    console.log("hey");

    selectedItemClearButton.addEventListener("click", function () {
      this.parentElement.classList.remove("filter-display");
    });
  }
}

function clearInput(index) {
  //   console.log("1", index);
  const input = document.querySelectorAll(".dropdown-search")[index];
  input.value = "";
  input.focus();
  filterList(input, index);
}
