import React from 'react';
import uuidv4 from 'uuid/v4';
import { Redirect } from 'react-router-dom';
import ingredients from '../utils/ingredients';
import PropTypes from 'prop-types';

function Form({
	currentlySelectedIngredient,
	currentlySelectedGenre,
	genres,
	handleFormSubmit,
	handleFormChange,
	isSubmitted,
}) {
	return (
		<main className="wrapper">
			{/* if the form has been submitted, redirect to results */}
			{isSubmitted && <Redirect to="/results/recommendations/" />}
			{/* blurb talking about the app */}
			<p>
				With Fermented Films, pick an ingredient theme for the evening and select your preferred movie genre.
				We'll curate a meal, drink, and movie combination around your selections. Don't like one of our
				recommendations? Click "Shake it up!" and we'll find another that suits your needs.
			</p>

			{/* form to submit ingredient theme and movie genres */}
			<form className="form">
				<fieldset>
					<legend className="formText">Choose an Ingredient Theme:</legend>
					<div className="gallery">
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
										<img src={ingredient.picture} alt={ingredient.name} />
									</label>
								</div>
							);
						})}
					</div>
				</fieldset>
				<fieldset>
					<legend className="formText">Do you have a preferred movie genre?</legend>
					<div className="gallery">
						{genres.map(genre => {
							return (
								<div key={uuidv4()} className="genres">
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
				</fieldset>

				<p className="formText">
					Ingredient Theme Selection: <span className="specialWord">{currentlySelectedIngredient}</span>
				</p>

				<p className="formText">
					Movie Genre Selection: <span className="specialWord">{currentlySelectedGenre}</span>
				</p>

				{/* button submits form */}
				<button onClick={handleFormSubmit}>Submit</button>
			</form>
		</main>
	);
}

Form.propTypes = {
	currentlySelectedIngredient: PropTypes.string,
	currentlySelectedGenre: PropTypes.string,
	genres: PropTypes.array,
	handleFormSubmit: PropTypes.func,
	handleFormChange: PropTypes.func,
	isSubmitted: PropTypes.bool,
};

export default Form;
