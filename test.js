let count = 0;

function handleDropdownClick() {
  count++;
  console.log(count);
  // console.log(uniqueIngredients.length);
  ingredientDropdownShow(uniqueIngredients);
}

// Ajoutez l'événement
dropdownButton.addEventListener("click", handleDropdownClick);

// Pour enlever l'événement avant de le relancer
function resetDropdownEvent() {
  dropdownButton.removeEventListener("click", handleDropdownClick);
  // Vous pouvez ajouter à nouveau l'événement si nécessaire
  dropdownButton.addEventListener("click", handleDropdownClick);
}

// Exemple d'utilisation
resetDropdownEvent(); // Cela enlève l'événement et le réajoute
