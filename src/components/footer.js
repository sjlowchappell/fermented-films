import React from 'react';

function Footer() {
	return (
		<footer>
			<div className="wrapper">
				<p>© {new Date().getFullYear()} built by Sam Low-Chappell</p>
			</div>
		</footer>
	);
}

export default Footer;
