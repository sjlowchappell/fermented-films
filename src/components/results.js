import React from 'react';
import { Link } from 'react-router-dom';

function Results({ drink, meal, movie }) {
	return (
		<div className="wrapper">
			{/* info about current selections */}
			<h2>
				Tonight You'll be drinking a{' '}
				<Link className="specialWord" to="/results/drink/">
					{drink.strDrink}
				</Link>
				, eating{' '}
				<Link className="specialWord" to="/results/meal/">
					{meal.strMeal}
				</Link>
				, while watching{' '}
				<Link className="specialWord" to="/results/movie/">
					{movie.title}
				</Link>
				.
			</h2>

			{/* links to navigate through the different results panes */}
			<nav className="resultsNav">
				<Link to="/results/recommendations/">All Recommendations</Link>
				<nav className="subNav">
					<Link to="/results/drink/">Drink Recipe</Link>
					<>|</>
					<Link to="/results/meal/">Meal Recipe</Link>
					<>|</>
					<Link to="/results/movie/">Movie Info</Link>
				</nav>
			</nav>
		</div>
	);
}

export default Results;
