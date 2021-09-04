import React from 'react';
import { Link } from 'react-router-dom';

const SplashFooter = () => {
	return (
		<footer className="splash-footer">
			<nav className="splash-footer-nav">
				<div className="splash-footer-text">
					<h1>Ready to try Cha-aux? It's free!</h1>
					<h3>Join over 30 players today</h3>
				</div>
				<Link to="/signup">Sign Up Now</Link>
			</nav>
		</footer>
	);
};

export default SplashFooter;
