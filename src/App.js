import React from 'react';
import './App.css';
import Header from './components/header';
import Form from './components/form';
import Footer from './components/footer';

function App() {
	const ingredients = ['lime', 'cream'];
	return (
		<div className="App">
			<Header />
			<main>
				<div className="wrapper">
					<p>
						With Fermented Films, pick an ingredient theme for the evening. Specify any dietary restrictions
						and we'll curate a meal, drink, and movie combination around your selections. Don't like one of
						the available options? Click "SHake it up!" and we'll find another that suits your needs.
					</p>

					<Form ingredients={ingredients} />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
