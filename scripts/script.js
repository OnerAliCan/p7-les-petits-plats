// eslint-disable-next-line no-unused-vars
function dropdownShow() {
	document.getElementById("dropdown-items").classList.toggle("show");
	// console.log(typeof recipes);
	let ingredientNameArray = [];

	// eslint-disable-next-line no-undef
	recipes.forEach((recipe) => {
		const recipeIngredients = recipe.ingredients;
		recipeIngredients.forEach((IngredientObject) => {
			const ingredientName = IngredientObject.ingredient;
			//ajouter la fonction qui enlève les doublons
			ingredientNameArray.push(ingredientName);
			// console.log(ingredientNameArray);
		});
	});

	const uniqueIngredientNameArray = [
		...new Set(
			ingredientNameArray.map((ingredient) =>
				ingredient.trim().toLowerCase()
			)
		),
	];

	const formattedIngredientArray = uniqueIngredientNameArray
		.map(
			(ingredient) =>
				ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
		)
		.sort();

	formattedIngredientArray.forEach((ingredient) => {
		const itemDropdown = document.createElement("a");
		const dropdownItems = document.getElementById("dropdown-items");
		itemDropdown.classList.add("item-dropdown");
		itemDropdown.innerText = ingredient;
		dropdownItems.appendChild(itemDropdown);
		itemDropdown.addEventListener("click", () => saveSelect(ingredient));
	});

	document
		.getElementById("dropdown-button")
		.classList.toggle("border-radius-bottom");
}

function filterFunction() {
	const input = document.getElementById("dropdown-search");
	const filter = input.value.toUpperCase();
	const div = document.getElementById("dropdown-items");
	const a = div.getElementsByTagName("a");
	for (let i = 0; i < a.length; i++) {
		// eslint-disable-next-line no-undef
		txtValue = a[i].textContent || a[i].innerText;
		// eslint-disable-next-line no-undef
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}

// eslint-disable-next-line no-unused-vars
function clearInput() {
	const input = document.getElementById("dropdown-search");
	input.value = "";
	input.focus();
	filterFunction(); // Remet le focus sur le champ input
}

function saveSelect(ingredient) {
	console.log(ingredient);
}
