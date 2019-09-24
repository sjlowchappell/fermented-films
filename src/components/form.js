import React, { Component } from 'react';

class Form extends Component {
	constructor({ ingredients }) {
		super();
		this.state = {
			ingredients: ingredients,
			ingredient: 'lime',
			restrictions: 'No Restrictions',
		};
	}

	handleChange = e => {
		const key = e.target.id;
		const value = e.target.value;
		this.setState({
			[key]: value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
	};

	render() {
		return (
			<form>
				<label htmlFor="ingredient">Pick an Ingredient Theme</label>
				<select onChange={this.handleChange} name="ingredient" id="ingredient" value={this.state.ingredient}>
					{this.state.ingredients.map(ingredient => {
						return <option value={ingredient}>{ingredient}</option>;
					})}
				</select>

				<label htmlFor="restrictions">Are you vegetarian or vegan?</label>
				<select onChange={this.handleChange} name="restrictions" id="restrictions">
					<option value="No Restrictions">No Restrictions</option>
					<option value="Vegetarian">Vegetarian</option>
					<option value="Vegan">Vegan</option>
				</select>

				<button onClick={this.handleSubmit}>Submit</button>
			</form>
		);
	}
}

export default Form;
