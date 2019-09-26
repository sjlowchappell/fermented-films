import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/header';
import Form from './components/form';
import Footer from './components/footer';
import Recommendation from './components/recommendation';
import GroceryList from './components/groceryList';
import uuidv4 from 'uuid/v4';

const ingredients = ['lime', 'cream'];
class App extends Component {
	constructor() {
		super();
		this.state = {
			ingredient: 'lime',
			restrictions: 'No Restrictions',
			currentSelections: [],
		};
	}

	fetchData = (url, parameters) => {
		return axios.get(url, {
			params: parameters,
		});
	};

	getDataForList = list => {
		return list.map(item => {
			return this.fetchData(item.url, item.params);
		});
	};

	chooseNewOption = (list, num) => {
		const newIndex = Math.floor(Math.random() * num);
		return list[newIndex];
	};

	handleFormSubmit = async e => {
		e.preventDefault();
		const drinkParams = { i: this.state.ingredient };
		const movieParams = {
			api_key: '78bc17b4e102a33a55c252cd4873cbe7',
			language: 'en-US',
			query: this.state.ingredient,
			page: 1,
			include_adult: false,
		};
		const initialDataRequests = [
			{
				url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?',
				params: drinkParams,
			},
			{
				url: 'https://www.themealdb.com/api/json/v1/1/filter.php?',
				params: drinkParams,
			},
			{ url: 'https://api.themoviedb.org/3/search/movie?', params: movieParams },
		];
		const requestList = this.getDataForList(initialDataRequests);
		const initialInfo = await Promise.all(requestList);

		const drinkList = initialInfo[0].data.drinks;
		const mealList = initialInfo[1].data.meals;
		const movieList = initialInfo[2].data.results;
		const newDrink = this.chooseNewOption(drinkList, drinkList.length);
		const newMeal = this.chooseNewOption(mealList, mealList.length);
		const newMovie = this.chooseNewOption(movieList, movieList.length);
		const secondMovieParams = {
			api_key: '78bc17b4e102a33a55c252cd4873cbe7',
			language: 'en-US',
		};

		const secondDataRequests = [
			{ url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?', params: { i: newDrink.idDrink } },
			{ url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?', params: { i: newMeal.idMeal } },
			{ url: `https://api.themoviedb.org/3/movie/${newMovie.id}`, params: secondMovieParams },
		];

		const secondRequestList = this.getDataForList(secondDataRequests);
		const secondInfo = await Promise.all(secondRequestList);

		// const currentDrink = secondInfo[0].data.drinks[0];
		// const currentMeal = secondInfo[1].data.meals[0];
		// const currentMovie = secondInfo[2].data;
		const currentSelections = [secondInfo[0].data.drinks[0], secondInfo[1].data.meals[0], secondInfo[2].data];
		this.setState({
			drinkOptions: drinkList,
			mealOptions: mealList,
			movieOptions: movieList,
			currentSelections: currentSelections,
		});
	};
	handleFormChange = e => {
		const key = e.target.id;
		const value = e.target.value;
		this.setState({
			[key]: value,
		});
	};

	renderRecommendations() {
		const { currentSelections } = this.state;
		console.log(currentSelections);
		if (currentSelections.length !== 0) {
			const drink = this.state.currentSelections[0];
			const meal = this.state.currentSelections[1];
			const movie = this.state.currentSelections[2];

			return (
				<div>
					<h2>
						Tonight You'll be drinking a {drink.strDrink}, eating a {meal.strMeal} while watching{' '}
						{movie.title}.
					</h2>
					{currentSelections.map(selection => {
						return <Recommendation key={uuidv4()} selection={selection} />;
					})}
					<h2>
						To prepare for your evening, first you'll need to pick up your groceries, prepare your food and
						drink, and then get watching.
					</h2>
					<h2>Grocery List:</h2>
					<GroceryList drink={drink} meal={meal} />
					<h2>Instructions:</h2>
				</div>
			);
		}
	}

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
						{this.renderRecommendations()}
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default App;
