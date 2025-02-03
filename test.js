for (let i = 0; i < dropdownButtons.length; i++) {
  const dropdownButton = dropdownButtons[i];
  const dropdownContent = dropdownButton.nextElementSibling;

  dropdownButton.addEventListener("click", () =>
    dropdownShow(dropdownButton, dropdownContent)
  );

  // Ajoutez les gestionnaires d'événements pour les éléments de dropdown ici
  const dropdownItems = dropdownContent.querySelectorAll(".item-dropdown");
  for (let j = 0; j < dropdownItems.length; j++) {
    const dropdownItem = dropdownItems[j];
    dropdownItem.addEventListener("click", () => saveSelect(dropdownItem));
  }
}

function dropdownShow(dropdownButton, dropdownContent) {
  dropdownButton.nextElementSibling.classList.toggle("show");
  dropdownButton.classList.toggle("border-radius-bottom");
}

function saveSelect(dropdownItem) {
  let selectedElementText =
    (dropdownItem.parentElement.parentElement.parentElement.parentElement.nextElementSibling.childNodes[1].childNodes[1].innerText =
      dropdownItem.innerText);

  document.querySelector(".selected-item").classList.add("show");

  console.log("yo ", selectedElementText);
}
