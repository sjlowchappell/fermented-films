import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';

function Movie({ movie, onClick }) {
	const { title, poster_path, release_date, runtime, popularity, genres, overview } = movie;
	const posterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
	return (
		<div className="wrapper">
			<div>
				{/* Movie Info, pair movie poster with movie details, followed by its description*/}
				<h2>{title}</h2>
				<div className="movieRecommendation">
					<div className="moviePoster">
						<img src={posterPath} alt={`${title} movie poster`} />
					</div>
					<div>
						<p>
							<span className="specialWord">Release date:</span> {release_date}
						</p>
						<p>
							<span className="specialWord">Run time:</span> {runtime} minutes
						</p>
						<p>
							<span className="specialWord">Popularity:</span> {popularity} / 100
						</p>
						{/* Conditionally render genres if there are any */}
						{genres.length !== 0 ? (
							<>
								<p className="specialWord">Genres:</p>
								<ul>
									{genres.map(genre => {
										return (
											<li key={uuidv4()} className="genreList">
												{genre.name}
											</li>
										);
									})}
								</ul>
							</>
						) : null}
					</div>
				</div>
				<div>
					<p className="specialWord">Description:</p>
					<p>{overview}</p>
					<div className="buttonBox">
						<button onClick={onClick} value="2">
							Shake it Up!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

Movie.propTypes = {
	movie: PropTypes.object,
	onClick: PropTypes.func,
};

export default Movie;
