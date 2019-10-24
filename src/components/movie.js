import React from 'react';
import uuidv4 from 'uuid/v4';

function Movie({ movie, onClick }) {
	console.log(movie);
	const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	return (
		<div className="wrapper">
			<div className="movie-recommendation">
				{/* Movie Info: */}
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

export default Movie;
