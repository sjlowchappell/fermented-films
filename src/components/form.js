import React from 'react';
import uuidv4 from 'uuid/v4';
import { Redirect } from 'react-router-dom';

function Form({ ingredient, ingredients, handleFormSubmit, handleFormChange, isSubmitted }) {
	const currentlySelectedIngredient = ingredient;
	return (
		<main className="wrapper">
			{/* if the form has been submitted, redirect to results */}
			{isSubmitted && <Redirect to="/results/recommendations/" />}
			{/* blurb talking about the app */}
			<p>
				With Fermented Films, pick an ingredient theme for the evening. We'll curate a meal, drink, and movie
				combination around your selection. Don't like one of the available options? Click "Shake it up!" and
				we'll find another that suits your needs.
			</p>

			{/* form to submit ingredient theme */}
			<form>
				<label htmlFor="ingredient">Pick an Ingredient Theme</label>
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
										<img src={ingredient.picture} alt="" />
									</div>
									<p>{ingredient.name}</p>
								</label>
							</div>
						);
					})}
				</div>

				{/* button submits form */}
				<button onClick={handleFormSubmit}>Submit</button>
			</form>
		</main>
	);
}

export default Form;

// Goal:
// Add an option to filter by genre, popularity, or language:
//     -Need to check to make sure there is at least 1 movie for each genre in the arrays
//     -Could potentially do a search to gather all the movies of each option, get the genre ids, compare what ones are available for every search, and then set those as the specific options people can filter by.
// Turn ingredients dropdown into a gallery of cards with images and ingredient names

// {
// 	/* Need to adjust the handle form change, but the below code will allow for a gallery of ingredient options */
// }
// {

// }
