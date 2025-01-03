// eslint-disable-next-line no-unused-vars
function dropdownShow() {
	document.getElementById("dropdown-items").classList.toggle("show");
	// console.log(typeof recipes);
	let ingredientNameArray = [];
	console.log(document.dataset);
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
		// eslint-disable-next-line no-undef
		itemDropdown.addEventListener("click", () => saveSelect(ingredient));
	});

	document
		.getElementById("dropdown-button")
		.classList.toggle("border-radius-bottom");
}
