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

	fetchData = (url, parameters) => {
		return axios.get(url, {
			params: parameters,
		});
	};

	handleFormSubmit = async e => {
		e.preventDefault();
		const drinkParams = { i: this.state.ingredient };
		const movieParams = {
			api_key: '78bc17b4e102a33a55c252cd4873cbe7',
			langue: 'en-US',
			query: this.state.ingredient,
			page: 1,
			include_adult: false,
		};
		const requests = [
			{ url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?', params: drinkParams },
			{ url: 'https://www.themealdb.com/api/json/v1/1/filter.php?', params: drinkParams },
			{ url: 'https://api.themoviedb.org/3/search/movie?', params: movieParams },
		];
		const requestList = requests.map(request => {
			return this.fetchData(request.url, request.params);
		});
		const info = await Promise.all(requestList);
		console.log(info);
		this.setState({
			drinkOptions: info[0].data.drinks,
			mealOptions: info[1].data.meals,
			movieOptions: info[2].data.results,
		});
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
