import React from 'react';
import { Link } from 'react-router-dom';
import ServerNavItem from './server_nav_item';
import ServerForm from './server_form_container';
import { scalarArraysAreEqual } from '../../util/helper_functions';

import TempJoinServer from '../temp_join_server';
import TempLogout from '../temp_logout';
import ServerIndex from './server_index_container';
import ChannelNav from '../channels/channel_nav_container';

class ServerNav extends React.Component {
	constructor(props) {
		super(props);

		this.handleCreationClick = this.handleCreationClick.bind(this);
		this.state = {
			currentServerId: null
		};
	}

	componentDidMount() {
		this.props.getJoinedServers();
	}

	componentDidUpdate(prevProps) {
		const currentServerId = parseInt(this.props.location.pathname.split('/')[2]);
		if (currentServerId && this.state.currentServerId !== currentServerId) {
			this.setState({ currentServerId });
		}
		if (currentServerId && !scalarArraysAreEqual(this.props.fetchedServerIds, prevProps.fetchedServerIds)) {
			this.props.getServer(currentServerId);
		}
		if (currentServerId && !scalarArraysAreEqual(this.props.joinedServerIds, prevProps.joinedServerIds)) {
			this.props.getJoinedServers();
			this.setState({ currentServerId });
		}
	}

	handleCreationClick(e) {
		e.preventDefault();
		this.props.openModal();
	}

	render() {
		const discoveryPage = this.props.location.pathname.split('/')[1] === 'server-discovery';
		let serverIndex;
		let channelNav;
		let discoveryNavIndicatorClass = 'server-nav-selector-indicator';
		let discoveryNavIconClass = 'server-nav-discovery-icon';
		if (discoveryPage) {
			serverIndex = <ServerIndex />;
			discoveryNavIndicatorClass = discoveryNavIndicatorClass.concat(' active');
			discoveryNavIconClass = discoveryNavIconClass.concat(' active');
		} else {
			channelNav = <ChannelNav currentServerId={this.state.currentServerId} />;
		}
		let serverLis;
		const currentServerId = this.state.currentServerId;
		serverLis = Object.values(this.props.joinedServers).map(server => {
			const activeServer = currentServerId === server.id ? 'active' : '';
			return <ServerNavItem key={server.id} server={server} activeServer={activeServer} />;
		});
		serverLis.splice(1, 0, <li key={0} className="server-nav-separator" />);
		let tempJoinServer;
		if (
			this.state.currentServerId &&
			!discoveryPage &&
			!this.props.joinedServerIds.includes(this.state.currentServerId) &&
			this.props.fetchedServers[this.state.currentServerId]
		) {
			const activeServer = this.props.fetchedServers[this.state.currentServerId];
			serverLis.splice(
				1,
				0,
				<ServerNavItem key={this.state.currentServerId} server={activeServer} activeServer="active" />
			);
			tempJoinServer = <TempJoinServer server={activeServer} />;
		}
		return (
			<div className="server-container">
				<nav className="server-nav">
					<ul className="server-nav-list">
						{serverLis}
						<li className="server-nav-li">
							<button className="server-nav-create" onClick={this.handleCreationClick}>
								<div className="server-nav-create-icon" />
							</button>
							<div className="server-name-label-container">
								<div className="server-nav-arrow-left" />
								<span className="server-nav-li-link-name">Add a Server</span>
							</div>
							<div className="server-nav-selector-container">
								<div className="server-nav-selector-indicator" />
							</div>
						</li>
						<li className="server-nav-li">
							<Link to="/server-discovery" className="server-nav-discovery">
								<div className={discoveryNavIconClass} />
							</Link>
							<div className="server-name-label-container">
								<div className="server-nav-arrow-left" />
								<span className="server-nav-li-link-name">Server Discovery</span>
							</div>
							<div className="server-nav-selector-container">
								<div className={discoveryNavIndicatorClass} />
							</div>
						</li>
					</ul>
				</nav>
				{channelNav}
				{tempJoinServer}
				{serverIndex}
				<ServerForm />
			</div>
		);
	}
}

export default ServerNav;
