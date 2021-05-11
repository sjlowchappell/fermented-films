import React from 'react';

function Footer() {
	return (
		<footer>
			<div className="wrapper">
				<p>
					© {new Date().getFullYear()} <a href="https://samlow-chappell.com">Sam Low-Chappell</a>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
