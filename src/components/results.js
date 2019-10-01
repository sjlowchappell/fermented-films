import React from 'react';
import { Link } from 'react-router-dom';

function Results({ currentSelections }) {
	const drink = currentSelections[0];
	const meal = currentSelections[1];
	const movie = currentSelections[2];

	return (
		<div className="wrapper">
			<h2>
				Tonight You'll be drinking a <span className="specialWord">{drink.strDrink}</span>, eating{' '}
				<span className="specialWord">{meal.strMeal}</span>, while watching{' '}
				<span className="specialWord">{movie.title}</span>.
			</h2>
			<Link to="/results/recommendations/">Recommendations</Link>
			<Link to="/results/groceries/">Groceries</Link>
			<Link to="/results/recipes/">Recipes</Link>
		</div>
	);
}

export default Results;
