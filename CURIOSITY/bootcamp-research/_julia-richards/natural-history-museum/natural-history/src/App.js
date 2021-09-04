import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GalleryNavigation from "./components/GalleryNavigation";
import GalleryView from "./components/GalleryView";

const App = () => {
	const [galleries, setGalleries] = useState([]);

	useEffect(() => {
		const getGalleries = async () => {
			const res = await await fetch(
				"https://data.nhm.ac.uk/api/3/action/package_list"
			);
			const galleryList = await res.json();
			setGalleries(galleryList.result.slice(0, 10));
		};

		getGalleries();
		// console.log('Hello!');
	}, []);

	return (
		<BrowserRouter>
			<GalleryNavigation galleries={galleries}>
				<h1>Simple React App</h1>
			</GalleryNavigation>
			<Switch>
				<Route exact path="/" />
				<Route path="/gallery/:id" component={GalleryView} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
