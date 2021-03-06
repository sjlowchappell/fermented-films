import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/header';
import Form from './components/form';
import Results from './components/results';
import Recommendation from './components/recommendation';
import Recipe from './components/recipe';
import Movie from './components/movie';
import Footer from './components/footer';
import genres from './utils/genres';

// so far I know that there are movie options for comedy and drama for all ingredients. Would be nice to pick one more genre filter option

class App extends Component {
	constructor() {
		super();
		this.state = {
			ingredient: 'lime',
			genre: 'any!',
			isSubmitted: false,
		};
	}
	// Form related functions:
	// Submit form
	handleFormSubmit = async e => {
		e.preventDefault();
		// get lists of drinks, meals, and movies
		await this.getLists();
		// Select a current drink, meal, and movie
		await this.getCurrentSelections();
		// Update form submission in state
		this.setState({
			isSubmitted: true,
		});
	};

	// When there is a form change, update stay based on what input has been selected
	handleFormChange = e => {
		const key = e.target.name;
		const value = e.target.value;
		this.setState({
			[key]: value,
		});
	};

	// Axios related functions:
	// axios request to get info from url and parameters
	fetchData = (url, parameters) => {
		return axios.get(url, {
			params: parameters,
		});
	};

	// returns results for a list of urls and parameters (helpful when finding data for meals, drinks, and movies all at the same time)
	fetchDataForList = list => {
		return Promise.all(
			list.map(item => {
				return this.fetchData(item.url, item.params);
			}),
		);
	};

	// Get lists of potential drinks, meals, and movies based on ingredient and genre selections
	getLists = async () => {
		// Set parameters for all 3 different api calls
		const ingredientParams = { i: this.state.ingredient };
		const movieParams = {
			api_key: '78bc17b4e102a33a55c252cd4873cbe7',
			language: 'en-US',
			query: this.state.ingredient,
			include_adult: false,
		};

		// Create an array of urls and parameters to send to fetchDataForList
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
		const listData = await this.fetchDataForList(listEndpoints);

		// Filter movies by genre selection and to remove anything that doesn't have a poster image
		const filteredMovies = this.filterMovies(listData[2].data.results);

		// Set state based on new lists of drinks, meals, and movies
		this.setState({
			curatedLists: [listData[0].data.drinks, listData[1].data.meals, filteredMovies],
		});
	};

	// filters movies to ensure there is a poster path, and filters by genre selection
	filterMovies = list => {
		// extract genre object by comparing currently selected genre to the set data list of genres (needed to pair genreID with genre name for filtering purposes)
		const genreObj = genres.find(genre => genre.name === this.state.genre);
		// If a genre filter has been selected, filter by genre and poster path. Otherwise, just filter out movies with no poster path
		if (genreObj.id !== null) {
			return list
				.filter(movie => movie.poster_path !== null)
				.filter(movie => {
					return movie.genre_ids.some(genre => genre === genreObj.id);
				});
		} else {
			return list.filter(movie => movie.poster_path !== null);
		}
	};

	// Get currently selected drink, meal, and movie based on lists
	getCurrentSelections = async () => {
		// Once the lists have been set, we select a current choice for movie, drink, and meal and save them in a newSelections array
		const newSelections = this.state.curatedLists.map(list => {
			return this.chooseNewOption(list, list.length);
		});

		// Create an array of urls and parameters to send to fetchDataForList
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
				params: {
					api_key: '78bc17b4e102a33a55c252cd4873cbe7',
					language: 'en-US',
				},
			},
		];

		// Make api calls based on passed endpoints
		const selectionData = await this.fetchDataForList(selectionEndpoints);

		// Set state with lists and current selections
		this.setState({
			currentSelections: [selectionData[0].data.drinks[0], selectionData[1].data.meals[0], selectionData[2].data],
		});
	};

	// Results related Functions:
	// Pairs ingredient measures with ingredient names based on results from api call
	getIngredientArray = (food, num) => {
		const ingredientArray = [];
		for (let i = 1; i <= num; i++) {
			if (food[`strIngredient${i}`] !== '' && food[`strIngredient${i}`] !== null) {
				ingredientArray.push({
					measure: food[`strMeasure${i}`],
					name: food[`strIngredient${i}`],
				});
			}
			// check if I should include a else: break statement here
		}
		return ingredientArray;
	};

	// Get a new drink, meal, or movie
	shakeItUp = async e => {
		// get index value based on value set on original option
		const index = parseInt(e.target.value);

		// get a new drink, meal, or movie based on index of selected "shake it up"
		const newOption = this.chooseNewOption(this.state.curatedLists[index], this.state.curatedLists[index].length);
		const dataRequestOptions = [
			{ url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?', params: { i: newOption.idDrink } },
			{ url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?', params: { i: newOption.idMeal } },
			{
				url: `https://api.themoviedb.org/3/movie/${newOption.id}`,
				params: {
					api_key: '78bc17b4e102a33a55c252cd4873cbe7',
					language: 'en-US',
				},
			},
		];

		// Make an ajax request to the appropriate endpoint based on index
		const resolvedOption = await this.fetchData(dataRequestOptions[index].url, dataRequestOptions[index].params);

		// Conditional block to set the correct data based on index value
		let data;
		if (index === 0) {
			data = resolvedOption.data.drinks[0];
		} else if (index === 1) {
			data = resolvedOption.data.meals[0];
		} else {
			data = resolvedOption.data;
		}

		// get current selections from state
		const newSelections = [...this.state.currentSelections];

		// update selections based upon newly acquired data
		newSelections[index] = data;

		// set state with new selections
		this.setState({
			currentSelections: newSelections,
		});
	};

	// Helper for shakeItUp and getCurrentSelections
	chooseNewOption = (list, num) => {
		const newIndex = Math.floor(Math.random() * num);
		return list[newIndex];
	};

	render() {
		return (
			<Router>
				<ScrollToTop>
					<div className="App">
						{/* Start at home with just the Header and Footer showing */}
						<Route path="/" component={Header} />

						{/* Display the Form when the Get Started link is clicked in the header */}
						<Route
							path="/search/"
							render={props => (
								<Form
									{...props}
									currentlySelectedIngredient={this.state.ingredient}
									currentlySelectedGenre={this.state.genre}
									genres={genres}
									handleFormSubmit={this.handleFormSubmit}
									handleFormChange={this.handleFormChange}
									isSubmitted={this.state.isSubmitted}
								/>
							)}
						/>

						{/* If this form is submitted, render the results. Otherwise, Redirect to the home page */}
						{this.state.isSubmitted ? (
							<>
								<Route
									path="/results/"
									render={props => (
										<Results
											{...props}
											drink={this.state.currentSelections[0]}
											meal={this.state.currentSelections[1]}
											movie={this.state.currentSelections[2]}
										/>
									)}
								/>
								<Route
									path="/results/recommendations/"
									render={props => (
										<Recommendation
											{...props}
											onClick={this.shakeItUp}
											drink={this.state.currentSelections[0]}
											meal={this.state.currentSelections[1]}
											movie={this.state.currentSelections[2]}
										/>
									)}
								/>
								<Route
									path="/results/drink/"
									render={props => (
										<Recipe
											{...props}
											name={this.state.currentSelections[0].strDrink}
											image={this.state.currentSelections[0].strDrinkThumb}
											ingredientList={this.getIngredientArray(
												this.state.currentSelections[0],
												15,
											)}
											instructions={this.state.currentSelections[0].strInstructions}
											onClick={this.shakeItUp}
											value={'0'}
										/>
									)}
								/>
								<Route
									path="/results/meal/"
									render={props => (
										<Recipe
											{...props}
											name={this.state.currentSelections[1].strMeal}
											image={this.state.currentSelections[1].strMealThumb}
											ingredientList={this.getIngredientArray(
												this.state.currentSelections[1],
												20,
											)}
											instructions={this.state.currentSelections[1].strInstructions}
											onClick={this.shakeItUp}
											value={'1'}
										/>
									)}
								/>
								<Route
									path="/results/movie/"
									render={props => (
										<Movie
											{...props}
											onClick={this.shakeItUp}
											movie={this.state.currentSelections[2]}
										/>
									)}
								/>
							</>
						) : (
							<Redirect to="/" />
						)}
						<Footer />
					</div>
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;
