import React from 'react';
import ServerIndexItem from './server_index_item';
import { scalarArraysAreEqual } from '../../util/helper_functions';

class ServerIndex extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getAllServers();
	}

	componentDidUpdate(prevProps) {
		if (!scalarArraysAreEqual(this.props.serverIds, prevProps.serverIds)) {
			this.props.getAllServers();
		}
	}

	render() {
		const serverLis = this.props.servers
			? this.props.servers.map(server => {
					return (
						<li key={server.id} className="server-index-item-li">
							<ServerIndexItem server={server} />
						</li>
					);
				})
			: null;
		return (
			<div className="server-index-container">
				<div className="server-index-header">
					<h1 className="server-index-header-text">Find new communities on Cha-aux</h1>
					<div className="server-index-background" />
				</div>
				<h5 className="server-index-group-header">Popular servers and communities</h5>
				<ul className="server-index-list">{serverLis}</ul>
			</div>
		);
	}
}

export default ServerIndex;
