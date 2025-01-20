recettes (initiales)
Filtre modifié
recettes -(filtre)-> recettesFiltrées
filtre: texte saisi dans le champ de recherche -> ingrédients selecttionnés -> ustensils select. -> appareils select.
const receipes = [.....];
let ingredients = [];
let aplpiances = [];
let ustensils = [];
function filter()
{
	let r = [...recipes];
	r = r (filter by text in search field);
	r = r (filter by selected ingredients)
	r = r (filter by selected ustensils)
	r = r (filter by selected appliences)
	
	ingredients = extract ingredients from (r);
	populateList(ingredients, ingredientsContainer);
	
	appliances = extract appliences from (r);
	populateList(appliances, appliancesContainer);
	ustensils = extract ustensils from (r);
	populateList(ustensils, ustensilsContainer);
	
	display (r) in DOM
}
window.addEventListener("load", () => {
	filter();
});
// not this: window.addEventListener("load", filter);