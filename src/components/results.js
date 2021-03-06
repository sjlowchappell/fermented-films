import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Results({ drink, meal, movie }) {
	return (
		<div className="wrapper">
			{/* info about current selections, with links to more info on each */}
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
					<span aria-hidden="true" className="navDecorator">
						|
					</span>
					<Link to="/results/meal/">Meal Recipe</Link>
					<span aria-hidden="true" className="navDecorator">
						|
					</span>
					<Link to="/results/movie/">Movie Info</Link>
				</nav>
			</nav>
		</div>
	);
}

Results.propTypes = {
	drink: PropTypes.object,
	meal: PropTypes.object,
	movie: PropTypes.object,
};

export default Results;
