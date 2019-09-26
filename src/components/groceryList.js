import React from 'react';
import uuidv4 from 'uuid/v4';

function GroceryList({ drink, meal }) {
	const getIngredientArray = (food, num) => {
		const ingredientArray = [];
		for (let i = 1; i <= num; i++) {
			if (food[`strIngredient${i}`] !== '' && food[`strIngredient${i}`] !== null) {
				ingredientArray.push({
					measure: food[`strMeasure${i}`],
					name: food[`strIngredient${i}`],
				});
			}
		}
		return ingredientArray;
	};
	const drinkIngredients = getIngredientArray(drink, 15);
	const mealIngredients = getIngredientArray(meal, 20);

	return (
		<div>
			<h3>Here are your groceries:</h3>
			<h4>For your drink: {drink.strDrink}</h4>
			<ul>
				{drinkIngredients.map(ingredient => {
					return (
						<li key={uuidv4()}>
							{ingredient.measure} {ingredient.name}
						</li>
					);
				})}
			</ul>
			<h4>For your meal: {meal.strMeal}</h4>
			<ul>
				{mealIngredients.map(ingredient => {
					return (
						<li key={uuidv4()}>
							{ingredient.measure} {ingredient.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default GroceryList;
