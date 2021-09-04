import React from 'react';

const GalleryObject = (props) => {
    return (
        <>
            <p>Format: {props.format}</p>
            <p>State: {props.state}</p>
            <a href={props.url}>{props.name}</a>
        </>
    )
}

export default GalleryObject;