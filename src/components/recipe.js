import React from 'react';

function Recipe({ drink, meal }) {
	return (
		<div className="wrapper">
			<h3>Here are your Recipes:</h3>
			<h4>For your drink:</h4>
			<p>Prepare in a {drink.strGlass}</p>
			<p>{drink.strInstructions}</p>

			<h4>For your meal:</h4>
			<p>{meal.strInstructions}</p>
		</div>
	);
}

export default Recipe;
