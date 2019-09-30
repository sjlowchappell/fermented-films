import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import Footer from './footer';
import Recommendation from './recommendation';
import GroceryList from './groceryList';
import Recipe from './recipe';
import { Route, Link } from 'react-router-dom';

const ingredients = ['lime', 'lemon', 'egg', 'orange', 'water', 'ginger', 'strawberries', 'milk', 'red wine', 'sugar'];
class Start extends Component {
	constructor() {
		super();
		this.state = {
			ingredient: 'lime',
			restrictions: 'No Restrictions',
			currentSelections: [],
		};
	}

	shakeItUp = async e => {
		const movieParams = {
			api_key: '78bc17b4e102a33a55c252cd4873cbe7',
			language: 'en-US',
		};
		const index = parseInt(e.target.value);
		const listName = e.target.dataset.list;
		const newOption = this.chooseNewOption(this.state[listName], this.state[listName].length);
		const dataRequestOptions = [
			{ url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?', params: { i: newOption.idDrink } },
			{ url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?', params: { i: newOption.idMeal } },
			{ url: `https://api.themoviedb.org/3/movie/${newOption.id}`, params: movieParams },
		];

		const resolvedOption = await this.fetchData(dataRequestOptions[index].url, dataRequestOptions[index].params);
		let data;
		if (index === 0) {
			data = resolvedOption.data.drinks[0];
		} else if (index === 1) {
			data = resolvedOption.data.meals[0];
		} else {
			data = resolvedOption.data;
		}
		const newSelections = [...this.state.currentSelections];
		newSelections[index] = data;
		this.setState({
			currentSelections: newSelections,
		});
	};

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
		const filteredMovies = movieList.filter(movie => movie.poster_path !== null);
		const newDrink = this.chooseNewOption(drinkList, drinkList.length);
		const newMeal = this.chooseNewOption(mealList, mealList.length);
		const newMovie = this.chooseNewOption(filteredMovies, filteredMovies.length);
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

		const currentSelections = [secondInfo[0].data.drinks[0], secondInfo[1].data.meals[0], secondInfo[2].data];
		console.log(drinkList, mealList, filteredMovies);
		this.setState({
			drinkOptions: drinkList,
			mealOptions: mealList,
			movieOptions: filteredMovies,
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
		if (currentSelections.length !== 0) {
			const drink = this.state.currentSelections[0];
			const meal = this.state.currentSelections[1];
			const movie = this.state.currentSelections[2];

			return (
				<div>
					<h2>
						Tonight You'll be drinking a <span className="specialWord">{drink.strDrink}</span>, eating{' '}
						<span className="specialWord">{meal.strMeal}</span>, while watching{' '}
						<span className="specialWord">{movie.title}</span>.
					</h2>
					<Link to="/search/recommendations/">Recommendations</Link>
					<Link to="/search/groceries/">Groceries</Link>
					<Link to="/search/recipes/">Recipes</Link>
					<Route
						path="/search/recommendations/"
						render={props => (
							<Recommendation
								{...props}
								onClick={this.shakeItUp}
								selections={this.state.currentSelections}
							/>
						)}
					/>
					<Route
						path="/search/groceries/"
						render={props => <GroceryList {...props} drink={drink} meal={meal} />}
					/>
					<Route path="/search/recipes/" render={props => <Recipe {...props} drink={drink} meal={meal} />} />
					<Link to="/search/recommendations/">Recommendations</Link>
					<Link to="/search/groceries/">Groceries</Link>
					<Link to="/search/recipes/">Recipes</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
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

export default Start;
