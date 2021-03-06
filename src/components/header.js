import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ match }) {
	// save boolean to check if path is exact
	const isHome = match.isExact;

	// Conditionally render the header based on whether path is exact
	return isHome ? (
		<header className="homeHeader">
			<div className="wrapper">
				<h1>Fermented Films</h1>
				<p>One stop shop for a curated evening based on one ingredient.</p>

				<Link to="/search">
					<button>Get Started &gt;&gt;&gt;</button>
				</Link>
			</div>
		</header>
	) : (
		<header className="otherHeader">
			<div className="wrapper">
				<Link to="/">
					<h1>Fermented Films</h1>
				</Link>
			</div>
		</header>
	);
}

Header.propTypes = {
	match: PropTypes.object,
};

export default Header;
