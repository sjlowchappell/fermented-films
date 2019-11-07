import React from 'react';
import uuidv4 from 'uuid/v4';
import recipeStyles from './newRecipe.module.css';

// Things I need:
// consumable.strDrink or .strMeal
// ingredient array
// instructions

function NewRecipe({ name, image, ingredientList, instructions, movie }) {
	return (
		<div className="wrapper">
			<h2>{name}</h2>
			<div className={recipeStyles.container}>
				<div className={recipeStyles.image}>
					<img src={image} alt="" />
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
			<p>Instructions:</p>
			<p>{instructions}</p>
		</div>
	);
}

export default NewRecipe;

/*

{movie ? (
	// Got this code from https://medium.com/@kevinsimper/full-width-youtube-embed-with-react-js-responsive-embed-509de7e7c3bf
	<div
		className="video"
		style={{
			position: 'relative',
			paddingBottom: '56.25%' /* 16:9 ,
			paddingTop: 25,
			height: 0,
		}}
	>
		<h4>Video to follow recipe:</h4>
		<iframe
			title="recipe video"
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			}}
			src={movie}
			frameBorder="0"
		/>
	</div>
) : null}
*/
