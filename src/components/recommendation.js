import React from 'react';
import uuidv4 from 'uuid/v4';

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
					<div>
						<img src={drink.strDrinkThumb} alt="" />
					</div>
					<div>
						<h4>{drink.strDrink}</h4>
						<p>
							Category: {drink.strAlcoholic}, {drink.strCategory}
						</p>
					</div>
					<button onClick={onClick} data-list="drinkOptions" value="0">
						Shake it Up!
					</button>
				</div>

				{/* Meal Info: */}
				<div className="recommendation">
					<div>
						<img src={meal.strMealThumb} alt="" />
					</div>
					<div>
						<h4>{meal.strMeal}</h4>
						<p>{/* Category: {meal.strArea}, {meal.strCategory} */}</p>
						<p>
							Original Recipe: <a href={meal.strSource}>here</a>
						</p>
						<p>
							Video instructions can be found <a href={meal.strYoutube}>here</a>
						</p>
					</div>
					<button onClick={onClick} data-list="mealOptions" value="1">
						Shake it Up!
					</button>
				</div>
			</div>
			{/* Movie Info: */}
			<div className="movie-recommendation">
				<div>
					<img src={posterPath} alt="" />
				</div>
				<div>
					<h4>{movie.title}</h4>
					<p>Release date: {movie.release_date}</p>
					<p>Run time: {movie.runtime} minutes</p>
					<p>DESCRIPTION: {movie.overview}</p>
					<p>Genres:</p>
					<ul>
						{movie.genres.map(genre => {
							return <li key={uuidv4()}>{genre.name}</li>;
						})}
					</ul>
					<button onClick={onClick} data-list="movieOptions" value="2">
						Shake it Up!
					</button>
				</div>
			</div>
		</div>
	);
}

export default Recommendation;
