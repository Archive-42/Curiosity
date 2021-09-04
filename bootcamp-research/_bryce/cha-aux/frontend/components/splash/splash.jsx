import React from 'react';
import { Link } from 'react-router-dom';
import SplashNav from './splash_nav';
import SplashFooter from './splash_footer';

const Splash = () => {
	return (
		<div className="splash">
			<SplashNav />
			<div className="splash-main-content">
				<h1 className="splash-hook-header">It's time to ditch Skype and TeamSpeak.</h1>
				<div className="splash-description">
					<p className="splash-hook-body">
						All-in-one voice and text chat for gamers that's free, secure, and works on both your desktop
						and phone.
					</p>
					<p className="splash-hook-body">
						Stop paying for TeamSpeak servers and hassling with Skype. Simplify your life.
					</p>
				</div>
				<Link to="/login" className="splash-hook-button">
					Open Cha-aux in your browser
				</Link>
			</div>
			<div className="splash-background" />
			<SplashFooter />
		</div>
	);
};

export default Splash;
