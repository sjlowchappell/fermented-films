import React from 'react';
import uuidv4 from 'uuid/v4';
import { Redirect } from 'react-router-dom';

function Form({ ingredient, ingredients, genre, genres, handleFormSubmit, handleFormChange, isSubmitted }) {
	const currentlySelectedIngredient = ingredient;
	const currentlySelectedGenre = genre;
	return (
		<main className="wrapper">
			{/* if the form has been submitted, redirect to results */}
			{isSubmitted && <Redirect to="/results/recommendations/" />}
			{/* blurb talking about the app */}
			<p>
				With Fermented Films, pick an ingredient theme for the evening. We'll curate a meal, drink, and movie
				combination around your selection. Don't like one of our recommendations? Click "Shake it up!" and we'll
				find another that suits your needs.
			</p>
			<p>Pick an Ingredient Theme:</p>

			{/* form to submit ingredient theme */}
			<form>
				<div className="ingredientsGallery">
					{ingredients.map(ingredient => {
						return (
							<div key={uuidv4()}>
								<input
									type="radio"
									name="ingredient"
									id={ingredient.name}
									value={ingredient.name}
									onChange={handleFormChange}
									checked={currentlySelectedIngredient === ingredient.name}
								/>
								<label htmlFor={ingredient.name}>
									<div>
										<img src={ingredient.picture} alt={ingredient.name} />
									</div>
								</label>
							</div>
						);
					})}
				</div>

				<p>Do you have a preferred movie genre?</p>
				<div className="genresGallery">
					{genres.map(genre => {
						return (
							<div key={uuidv4()}>
								<input
									type="radio"
									name="genre"
									id={genre.name}
									value={genre.name}
									onChange={handleFormChange}
									checked={currentlySelectedGenre === genre.name}
								/>
								<label htmlFor={genre.name}>{genre.name}</label>
							</div>
						);
					})}
				</div>

				<p className="ingredientSelection">
					Ingredient Theme Selection: <span className="specialWord">{currentlySelectedIngredient}</span>
				</p>

				<p className="ingredientSelection">
					Movie Genre Selection: <span className="specialWord">{currentlySelectedGenre}</span>
				</p>

				{/* button submits form */}
				<button onClick={handleFormSubmit}>Submit</button>
			</form>
		</main>
	);
}

export default Form;
