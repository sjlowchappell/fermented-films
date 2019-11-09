import React from 'react';
import uuidv4 from 'uuid/v4';

function Movie({ movie, onClick }) {
	console.log(movie);
	const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	return (
		<div className="wrapper">
			<div>
				{/* Movie Info: */}
				<h2>{movie.title}</h2>
				<div className="movie-recommendation">
					<div className="moviePoster">
						<img src={posterPath} alt="" />
					</div>
					<div>
						<p>
							<span className="specialWord">Release date:</span> {movie.release_date}
						</p>
						<p>
							<span className="specialWord">Run time:</span> {movie.runtime} minutes
						</p>
						<p>
							<span className="specialWord">Popularity:</span> {movie.popularity} / 100
						</p>
						<p className="specialWord">Genres:</p>
						<ul>
							{movie.genres.map(genre => {
								return (
									<li key={uuidv4()} className="genreList">
										{genre.name}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div>
					<p className="specialWord">Description:</p>
					<p>{movie.overview}</p>
					<button onClick={onClick} data-list="movieOptions" value="2">
						Shake it Up!
					</button>
				</div>
			</div>
		</div>
	);
}

export default Movie;
