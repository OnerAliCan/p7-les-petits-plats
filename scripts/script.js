window.addEventListener("load", () => {
  setEvents();
  //   filter();
});

function setEvents() {
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  for (let i = 0; i < dropdownButtons.length; i++) {
    const dropdownButton = dropdownButtons[i];
    const dropdownContent = dropdownButton.nextElementSibling;

    dropdownButton.addEventListener("click", () =>
      dropdownShow(dropdownButton, dropdownContent, i)
    );
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

function dropdownShow(dropdownButton, dropdownContent) {
  dropdownButton.nextElementSibling.classList.toggle("show");

  const dropdownItems = dropdownContent.querySelectorAll(".item-dropdown");

  for (let i = 0; i < dropdownItems.length; i++) {
    const dropdownItem = dropdownItems[i];

    dropdownItem.addEventListener("click", () => saveSelect(dropdownItem));
  }
}

function saveSelect(dropdownItem) {
  console.log("hey");
  let selectedElementText =
    (dropdownItem.parentElement.parentElement.parentElement.parentElement.nextElementSibling.childNodes[1].childNodes[1].innerText =
      dropdownItem.innerText);

  document.querySelector(".selected-item-container").classList.add("show");

  console.log(selectedElementText);
}

function clearInput(index) {
  //   console.log("1", index);
  const input = document.querySelectorAll(".dropdown-search")[index];
  input.value = "";
  input.focus();
  filterList(input, index);
}
