import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.scss';
import Start from './components/start';
import Main from './components/main';

class App extends Component {
	constructor() {
		super();
		this.state = {
			ingredient: 'lime',
			restrictions: 'No Restrictions',
			currentSelections: [],
		};
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Route path="/" exact component={Main} />
					<Route path="/search/" component={Start} />
				</div>
			</Router>
		);
	}
}

export default App;
