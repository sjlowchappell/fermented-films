import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
	// Can use this to conditionally render the path
	console.log(props.match.path);
	return (
		<header>
			<div className="wrapper">
				<h1>Fermented Films</h1>
				<p>One stop shop for a curated evening based on one ingredient.</p>
				<Link to="/search">Get Started</Link>
			</div>
		</header>
	);
}

export default Header;
