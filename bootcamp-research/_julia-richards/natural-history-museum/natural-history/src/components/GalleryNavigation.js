import React from 'react';
import { NavLink } from 'react-router-dom'
const GalleryNavigation = (props) => {
    return (
        <>
            {props.galleries.map(gallery => <NavLink key={gallery} to={`/gallery/${gallery}`} style={{ padding: "5px" }}>{gallery}</NavLink>)}
        </>
    )
}

export default GalleryNavigation;