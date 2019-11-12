import React from 'react';
import { Link } from 'react-router-dom';

// sub-component to render each recommendation item as a circle with image and description with shake it up button
function RecommendationItem({ type, image, name, value, onClick }) {
	return (
		<div className="recommendation">
			<Link to={`/results/${type}/`} className="recommendation">
				<h3>Your {type}:</h3>
				<div className="recommendationCircle">
					<img src={image} alt={`${name}`} />
				</div>
				<h4>{name}</h4>
			</Link>
			<button onClick={onClick} value={value}>
				Shake it Up!
			</button>
		</div>
	);
}

// When displaying recommendations, set meal and drink next to each other, followed by movie
function Recommendation({ drink, meal, movie, onClick }) {
	const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	return (
		<div className="wrapper">
			<div className="recommendation-container">
				<RecommendationItem
					type={'drink'}
					image={drink.strDrinkThumb}
					name={drink.strDrink}
					value="0"
					onClick={onClick}
				/>
				<RecommendationItem
					type={'meal'}
					image={meal.strMealThumb}
					name={meal.strMeal}
					value="1"
					onClick={onClick}
				/>
			</div>
			<div className="recommendation">
				<RecommendationItem type={'movie'} image={posterPath} name={movie.title} value="2" onClick={onClick} />
			</div>
		</div>
	);
}

export default Recommendation;
