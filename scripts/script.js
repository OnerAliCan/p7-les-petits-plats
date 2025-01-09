/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function setEvents() {
	const dropdownButtons = document.querySelectorAll(".dropdown-button");

	dropdownButtons.forEach((dropdownButton, index) => {
		const dropdownContent = dropdownButton.nextElementSibling;

		dropdownButton.addEventListener("click", () =>
			dropdownShow(
				dropdownContent,
				dropdownButtons,
				dropdownButton,
				index
			)
		);
		return dropdownButton;
	});

	const dropdownSearchInputs = document.querySelectorAll(".dropdown-search");
	console.log(dropdownSearchInputs);

	dropdownSearchInputs.forEach((dropdownSearchInput, index) => {
		dropdownSearchInput.addEventListener("keyup", () => {
			filterList(dropdownSearchInputs, dropdownSearchInput, index);
		});
	});
}

function dropdownShow(dropdownContent, dropdownButtons, dropdownButton, index) {
	// console.log(dropdownButtons[index].nextElementSibling);
	dropdownButtons[index].nextElementSibling.classList.toggle("show");

	const itemDropdowns = dropdownContent.querySelectorAll(".item-dropdown");
	itemDropdowns.forEach((itemDropdown) => {
		itemDropdown.addEventListener("click", () => saveSelect(itemDropdown));
	});

	dropdownButton.classList.toggle("border-radius-bottom");
}

function filterList(dropdownSearchInputs, dropdownSearchInput, index) {
	// console.log(dropdownSearchInputs[index].value);
	// const input = document.querySelector(".dropdown-search");
	const filter = dropdownSearchInputs[index].value.toUpperCase();
	const div = document.querySelectorAll(".dropdown-content")[index];
	const a = div.getElementsByTagName("a");
	for (let i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}

function clearInput() {
	const input = document.querySelector(".dropdown-search");
	input.value = "";
	input.focus();
	filterList(dropdownSearchInputs, dropdownSearchInput, index);
}

function saveSelect(itemDropdown) {
	console.log(itemDropdown.textContent);
}

async function init() {
	setEvents();
}

window.onload = async function () {
	await init();
};
