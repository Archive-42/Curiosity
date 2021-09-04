import React from "react";

const OwnerLink = (props) => (
	<a href={props.href}>{`${props.firstName} ${props.lastName}`}</a>
);

export default OwnerLink;
