import React from 'react';
import { NavLink } from 'react-router-dom';

const ChannelNavItem = ({ serverId, channel, activeChannel }) => {
	const channelName = channel.name;
	const channelId = channel.id;
	return (
		<li className="channel-nav-li">
			<NavLink className="channel-nav-li-link" to={`/servers/${serverId}/channels/${channelId}`}>
				<span className="channel-symbol">#</span>
				<p className="channel-name">{channelName}</p>
			</NavLink>
		</li>
	);
};

export default ChannelNavItem;
