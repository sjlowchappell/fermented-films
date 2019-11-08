import React from 'react';

function Recommendation({ selections, onClick }) {
	const drink = selections[0];
	const meal = selections[1];
	const movie = selections[2];
	const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	return (
		<div className="wrapper">
			<div className="recommendation-container">
				{/* Drink Info: */}

				<div className="recommendation">
					<div className="recommendationCircle">
						<img src={drink.strDrinkThumb} alt="" />
					</div>
					<h4>{drink.strDrink}</h4>
					<button onClick={onClick} data-list="drinkOptions" value="0">
						Shake it Up!
					</button>
				</div>

				<div className="recommendation">
					<div className="recommendationCircle">
						<img src={meal.strMealThumb} alt="" />
					</div>
					<h4>{meal.strMeal}</h4>
					<button onClick={onClick} data-list="mealOptions" value="1">
						Shake it Up!
					</button>
				</div>
			</div>
			<div className="recommendation">
				<div className="recommendationCircle">
					<img src={posterPath} alt="" />
				</div>
				<h4>{movie.title}</h4>
				<button onClick={onClick} data-list="movieOptions" value="2">
					Shake it Up!
				</button>
			</div>
		</div>
	);
}

export default Recommendation;
