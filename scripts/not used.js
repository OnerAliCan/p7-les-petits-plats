/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function dropdownShow() {
	document.querySelector(".dropdown-content").classList.toggle("show");
	let ingredientNameArray = [];
	recipes.forEach((recipe) => {
		const recipeIngredients = recipe.ingredients;
		recipeIngredients.forEach((IngredientObject) => {
			const ingredientName = IngredientObject.ingredient;
			ingredientNameArray.push(ingredientName);
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
		const dropdownItems = document.querySelector(".dropdown-content");
		itemDropdown.classList.add("item-dropdown");
		itemDropdown.innerText = ingredient;
		dropdownItems.appendChild(itemDropdown);
		itemDropdown.addEventListener("click", () => saveSelect(ingredient));
	});

	document
		.querySelector(".dropdown-button")
		.classList.toggle("border-radius-bottom");
}
