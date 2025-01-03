function setEvents() {
	document
		.querySelector(".dropbtn")
		.addEventListener("click", () => dropdownShow());
}

// eslint-disable-next-line no-unused-vars
function dropdownShow() {
	document.querySelector(".dropdown-content").classList.toggle("show");
	// console.log(typeof recipes);
	let elementNameArray = [];

	const datasetValue = document.querySelector(".dropbtn").dataset.value;

	const datasetCategory = document.querySelector(".dropbtn").dataset.category;

	// eslint-disable-next-line no-undef
	recipes.forEach((recipe) => {
		const recipeElements = recipe[datasetValue];
		console.log(datasetValue);

		recipeElements.forEach((elementObject) => {
			const elementName = elementObject[datasetCategory];
			//ajouter la fonction qui enlève les doublons
			elementNameArray.push(elementName);
			// console.log(elementNameArray);
		});
	});

	const uniqueElementNameArray = [
		...new Set(
			elementNameArray.map((datasetValue) =>
				datasetValue.trim().toLowerCase()
			)
		),
	];

	const formattedElementArray = uniqueElementNameArray
		.map(
			(datasetValue) =>
				datasetValue.charAt(0).toUpperCase() + datasetValue.slice(1)
		)
		.sort();

	formattedElementArray.forEach((datasetValue) => {
		const itemDropdown = document.createElement("a");
		const dropdownItems = document.querySelector(".dropdown-content");
		itemDropdown.classList.add("item-dropdown");
		itemDropdown.innerText = datasetValue;
		dropdownItems.appendChild(itemDropdown);
		itemDropdown.addEventListener("click", () => saveSelect(datasetValue));
	});

	document.querySelector(".dropbtn").classList.toggle("border-radius-bottom");
}

function saveSelect(datasetValue) {
	console.log(datasetValue);
}

async function init() {
	//     const { urlIdNumber } = getParams();
	//     const { photographer, medias } = await getPhotographer(urlIdNumber);

	setEvents();
}

window.onload = async function () {
	await init();
};
