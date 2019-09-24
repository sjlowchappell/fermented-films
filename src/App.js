import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/header';
import Form from './components/form';
import Footer from './components/footer';

const ingredients = ['lime', 'cream'];
class App extends Component {
	constructor() {
		super();
		this.state = {
			ingredient: 'lime',
			restrictions: 'No Restrictions',
		};
	}

	fetchData = () => {
		return axios
			.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.ingredient}`)
			.then(res => console.log(res.data.drinks));
	};

	handleFormSubmit = e => {
		e.preventDefault();
		this.fetchData();
		console.log(this.state);
	};
	handleFormChange = e => {
		const key = e.target.id;
		const value = e.target.value;
		this.setState({
			[key]: value,
		});
	};
	render() {
		return (
			<div className="App">
				<Header />
				<main>
					<div className="wrapper">
						<p>
							With Fermented Films, pick an ingredient theme for the evening. Specify any dietary
							restrictions and we'll curate a meal, drink, and movie combination around your selections.
							Don't like one of the available options? Click "Shake it up!" and we'll find another that
							suits your needs.
						</p>
						<Form
							ingredient={this.state.ingredient}
							ingredients={ingredients}
							handleFormSubmit={this.handleFormSubmit}
							handleFormChange={this.handleFormChange}
						/>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default App;
