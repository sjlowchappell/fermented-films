import React from 'react';
import uuidv4 from 'uuid/v4';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';

function Recipe({ name, image, ingredientList, instructions, onClick, value }) {
	const expandDescription = e => {
		e.stopPropagation();
		const description = e.target.parentElement.previousElementSibling;
		const icon = e.target;
		console.log(description);
		console.log(icon);
		if (description.classList.contains('descriptionClosed')) {
			description.classList.toggle('descriptionClosed');
			icon.classList.toggle('closedIcon');
			icon.nextElementSibling.classList.toggle('closedIcon');
		} else {
			description.classList.toggle('descriptionClosed');
			icon.classList.toggle('closedIcon');
			icon.previousElementSibling.classList.toggle('closedIcon');
		}
	};
	return (
		<div className="wrapper">
			<h2>{name}</h2>
			{/* Set image next to ingredient list, followed by instructions*/}
			<div className="recipeContainer">
				<div className="recipeImage">
					<img src={image} alt={image} />
				</div>
				<div className="ingredientsContainer">
					<p>Ingredients:</p>
					<ul className="descriptionClosed">
						{ingredientList.map(ingredient => {
							return (
								<li key={uuidv4()}>
									<span className="specialWord">{ingredient.measure}</span> {ingredient.name}
								</li>
							);
						})}
					</ul>
					{/* if the description is too long, add a button to expand it */}
					{ingredientList.length > 10 ? (
						<button className="expandButton" onClick={expandDescription}>
							<img className="svgIcon" src={plusIcon} alt="Expand Description" />
							<img className="closedIcon svgIcon" src={minusIcon} alt="Collapse Description" />
						</button>
					) : null}
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
