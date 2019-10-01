import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.scss';
// import Start from './components/start';
// import Main from './components/main';
import Header from './components/header';
import axios from 'axios';
import Form from './components/form';
import Footer from './components/footer';
import Recommendation from './components/recommendation';
import GroceryList from './components/groceryList';
import Recipe from './components/recipe';

const ingredients = ['lime', 'lemon', 'egg', 'orange', 'water', 'ginger', 'strawberries', 'milk', 'red wine', 'sugar'];
class App extends Component {
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
		return Promise.all(
			list.map(item => {
				return this.fetchData(item.url, item.params);
			}),
		);
	};

	chooseNewOption = (list, num) => {
		const newIndex = Math.floor(Math.random() * num);
		return list[newIndex];
	};

	getLists = async () => {
		// The following gets lists of movies, drinks, and meals basd on ingredient selection
		// Set parameters for 3 different api calls
		const ingredientParams = { i: this.state.ingredient };
		const movieParams = {
			api_key: '78bc17b4e102a33a55c252cd4873cbe7',
			language: 'en-US',
			query: this.state.ingredient,
			include_adult: false,
		};

		// Create an array of urls and parameters to send to getDataForList
		const listEndpoints = [
			{
				url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?',
				params: ingredientParams,
			},
			{
				url: 'https://www.themealdb.com/api/json/v1/1/filter.php?',
				params: ingredientParams,
			},
			{ url: 'https://api.themoviedb.org/3/search/movie?', params: movieParams },
		];

		// Make api calls based upon passed endpoints
		const listData = await this.getDataForList(listEndpoints);

		// Filter movies to remove anything that doesn't have a poster image
		const filteredMovies = listData[2].data.results.filter(movie => movie.poster_path !== null);

		// Set state based on new lists of drinks, meals, and movies
		this.setState({
			curatedLists: [listData[0].data.drinks, listData[1].data.meals, filteredMovies],
		});
		console.log(this.state);
	};

	getCurrentSelections = async () => {
		// Once the lists have been established, we select a current choice for movie, drink, and meal and save them in a newSelections array

		// Set paramets for new api calls
		const newSelections = this.state.curatedLists.map(list => {
			return this.chooseNewOption(list, list.length);
		});
		const movieParams = {
			api_key: '78bc17b4e102a33a55c252cd4873cbe7',
			language: 'en-US',
		};

		// Create an array of urls and parameters to send to getDataForList
		const selectionEndpoints = [
			{
				url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?',
				params: { i: newSelections[0].idDrink },
			},
			{
				url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?',
				params: { i: newSelections[1].idMeal },
			},
			{
				url: `https://api.themoviedb.org/3/movie/${newSelections[2].id}`,
				params: movieParams,
			},
		];

		// Make api calls based on passed endpoints
		const selectionData = await this.getDataForList(selectionEndpoints);

		// Set state with lists and current selections
		this.setState({
			currentSelections: [selectionData[0].data.drinks[0], selectionData[1].data.meals[0], selectionData[2].data],
		});
	};

	handleFormSubmit = async e => {
		e.preventDefault();
		await this.getLists();
		this.getCurrentSelections();
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
				</div>
			);
		}
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<main>
						<div className="wrapper">
							<p>
								With Fermented Films, pick an ingredient theme for the evening. Specify any dietary
								restrictions and we'll curate a meal, drink, and movie combination around your
								selections. Don't like one of the available options? Click "Shake it up!" and we'll find
								another that suits your needs.
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
					{/* <Route path="/" exact component={Main} />
					<Route path="/search/" component={Start} />
					<Route path="/results/" />
					<Route
						path="/results/recommendations/"
						render={props => (
							<Recommendation
								{...props}
								onClick={this.shakeItUp}
								selections={this.state.currentSelections}
							/>
						)}
					/>
					<Route
						path="/results/groceries/"
						render={props => <GroceryList {...props} drink={drink} meal={meal} />}
					/>
					<Route path="/results/recipes/" render={props => <Recipe {...props} drink={drink} meal={meal} />} /> */}
				</div>
			</Router>
		);
	}
}

export default App;
