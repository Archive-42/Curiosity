import React from 'react';
import { Link } from 'react-router-dom';

const ServerIndexItem = ({ server }) => {
	return (
		<Link className="server-index-item-container" to={`servers/${server.id}`}>
			<div className="server-index-item-image-box">
				<img
					className="server-index-item-splash"
					src={server.icon_image}
					alt={`${server.name}_server_splash_image`}
				/>
				<img
					className="server-index-item-icon"
					src={server.icon_image}
					alt={`${server.name}_server_icon_image`}
				/>
			</div>
			<div className="server-index-item-info-box">
				<h5 className="server-index-item-name">{server.name}</h5>
				<p className="server-index-item-description" />
			</div>
			<div className="server-index-item-button">View</div>
		</Link>
	);
};

export default ServerIndexItem;
