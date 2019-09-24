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

			<label htmlFor="restrictions">Are you vegetarian or vegan?</label>
			<select onChange={handleFormChange} name="restrictions" id="restrictions">
				<option value="No Restrictions">No Restrictions</option>
				<option value="Vegetarian">Vegetarian</option>
				<option value="Vegan">Vegan</option>
			</select>

			<button onClick={handleFormSubmit}>Submit</button>
		</form>
	);
}

export default Form;
