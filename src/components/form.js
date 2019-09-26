import React from 'react';
import uuidv4 from 'uuid/v4';

function Form({ ingredient, ingredients, handleFormSubmit, handleFormChange }) {
	return (
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
	);
}

export default Form;

// Goal:
// Add an option to specify genres you are interested in
//     -Need to check to make sure there is at least 1 movie for each genre in the arrays
//     -Could potentially do a search to gather all the movies of each option, get the genre ids, compare what ones are available for every search, and then set those as the specific options people can filter by.
// Turn ingredients dropdown into a gallery of cards with images and ingredient names
