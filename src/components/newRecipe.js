import React from 'react';
import uuidv4 from 'uuid/v4';

// Things I need:
// consumable.strDrink or .strMeal
// ingredient array
// instructions

function NewRecipe({ name, image, ingredientList, instructions }) {
	return (
		<div className="wrapper">
			<h2>For your drink: {name}</h2>
			<div className="groceryList">
				<div>
					<img src={image} alt="" />
				</div>
				{/* <h4>For your drink: {name}</h4> */}
				<ul>
					{ingredientList.map(ingredient => {
						return (
							<li key={uuidv4()}>
								<span className="specialWord">{ingredient.measure}</span> {ingredient.name}
							</li>
						);
					})}
				</ul>
				<p>{instructions}</p>
			</div>
		</div>
	);
}

export default NewRecipe;
