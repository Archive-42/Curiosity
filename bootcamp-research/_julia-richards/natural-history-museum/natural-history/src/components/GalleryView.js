import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GalleryObject from './GalleryObject';

const GalleryView = () => {
	const params = useParams();
	const [gallery, setGallery] = useState();

	useEffect(() => {
		const getDetails = async () => {
			const res = await fetch(
				`https://data.nhm.ac.uk/api/3/action/package_show?id=${params.id}`
			);
			console.log(res);
			const galleryJSON = await res.json();
			await console.log("this is gallery JSON", galleryJSON);
			setGallery(galleryJSON);
		};
		getDetails();
	}, [params]);

	return (
		<React.Fragment>
			{/* if there is a gallery show gallery title, else don't show anything */}
			<header>{gallery && gallery.result.title}</header>
			<span>{gallery && gallery.result.isopen ? "currentlyOpen" : "closed"}</span>
			<p>{gallery && gallery.result.resources.map(object => <GalleryObject key={object.id} {...object} />)}</p>
		</React.Fragment>
	);
};

export default GalleryView;
