import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';

class Recipe extends Component {
	constructor() {
		super();
		this.state = {
			listState: 'closed',
		};
	}
	expandDescription = () => {
		this.state.listState === 'closed'
			? this.setState({ listState: 'open' })
			: this.setState({ listState: 'closed' });
	};
	largeList = list => {
		if (this.state.listState === 'closed') {
			return (
				<>
					<ul className="descriptionClosed">
						{list.map(ingredient => {
							return (
								<li key={uuidv4()}>
									<span className="specialWord">{ingredient.measure}</span> {ingredient.name}
								</li>
							);
						})}
					</ul>
					<button className="expandButton" onClick={this.expandDescription}>
						<img className="svgIcon" src={plusIcon} alt="Expand Description" />
					</button>
				</>
			);
		} else {
			return (
				<>
					<ul className="descriptionOpen">
						{list.map(ingredient => {
							return (
								<li key={uuidv4()}>
									<span className="specialWord">{ingredient.measure}</span> {ingredient.name}
								</li>
							);
						})}
					</ul>
					<button className="expandButton" onClick={this.expandDescription}>
						<img className="svgIcon" src={minusIcon} alt="Collapse Description" />
					</button>
				</>
			);
		}
	};
	render() {
		const { name, image, ingredientList, instructions, onClick, value } = this.props;
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
						{/* if the description is too long, add a button to expand it */}
						{ingredientList.length > 7 ? (
							this.largeList(ingredientList)
						) : (
							<ul className="descriptionClosed">
								{ingredientList.map(ingredient => {
									return (
										<li key={uuidv4()}>
											<span className="specialWord">{ingredient.measure}</span> {ingredient.name}
										</li>
									);
								})}
							</ul>
						)}
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
}

export default Recipe;
