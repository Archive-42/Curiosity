import React from 'react';
import { Link } from 'react-router-dom';

const SplashNav = () => {
	return (
		<header className="splash-header">
			<nav className="splash-header-nav">
				<Link to="/" className="splash-nav-logo">
					cha-aux
				</Link>
				<Link to="/login" className="splash-nav-login">
					Login
				</Link>
			</nav>
		</header>
	);
};

export default SplashNav;
