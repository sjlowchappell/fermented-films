import React from 'react';
import uuidv4 from 'uuid/v4';
import recipeStyles from './newRecipe.module.css';

function Recipe({ name, image, ingredientList, instructions, onClick, list, value }) {
	return (
		<div className="wrapper">
			<h2>{name}</h2>
			{/* Set image next to ingredient list, followed by instructions*/}
			<div className={recipeStyles.container}>
				<div className={recipeStyles.image}>
					<img src={image} alt={image} />
				</div>
				<div>
					<p>Ingredients:</p>
					<ul>
						{ingredientList.map(ingredient => {
							return (
								<li key={uuidv4()}>
									<span className="specialWord">{ingredient.measure}</span> {ingredient.name}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<p className="specialWord">Instructions:</p>
			<p>{instructions}</p>
			<div className="buttonBox">
				<button onClick={onClick} value={value}>
					Shake it Up!
				</button>
			</div>
		</div>
	);
}

export default Recipe;
