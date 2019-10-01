import React from 'react';
import uuidv4 from 'uuid/v4';
import { Redirect } from 'react-router-dom';

function Form({ ingredient, ingredients, handleFormSubmit, handleFormChange, isSubmitted }) {
	return (
		<div className="wrapper">
			{isSubmitted && <Redirect to="/results/recommendations/" />}
			<p>
				With Fermented Films, pick an ingredient theme for the evening. Specify any dietary restrictions and
				we'll curate a meal, drink, and movie combination around your selections. Don't like one of the
				available options? Click "Shake it up!" and we'll find another that suits your needs.
			</p>
			<form>
				<label htmlFor="ingredient">Pick an Ingredient Theme</label>
				<select onChange={handleFormChange} name="ingredient" id="ingredient" value={ingredient}>
					{ingredients.map(ingredient => {
						return (
							<option value={ingredient} key={uuidv4()}>
								{ingredient}
							</option>
						);
					})}
				</select>

				<button onClick={handleFormSubmit}>Submit</button>
			</form>
		</div>
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
// 	/* <div>
// 	{ingredients.map(ingredient => {
// 		return (
// 			<label value={ingredient} key={uuidv4()}>
// 				<input type="radio" name="ingredient" />
// 				{ingredient}
// 			</label>
// 		);
// 	})}
// </div> */
// }
