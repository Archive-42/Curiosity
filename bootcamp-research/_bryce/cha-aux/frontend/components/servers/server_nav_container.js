import { connect } from 'react-redux';
import ServerNav from './server_nav';
import { getServers, getServer } from '../../actions/server_actions';
import { openModal } from '../../actions/modal_actions';

const msp = state => {
	const joinedServerIds = state.entities.users[state.session.id].joinedServerIds;
	let joinedServers = {};
	joinedServerIds.forEach(id => {
		if (Object.keys(state.entities.servers).includes(id.toString())) {
			joinedServers[id] = state.entities.servers[id];
		}
	});
	return {
		joinedServerIds: joinedServerIds,
		joinedServers: joinedServers,
		fetchedServers: state.entities.servers,
		fetchedServerIds: Object.keys(state.entities.servers)
	};
};

const mdp = dispatch => {
	return {
		getJoinedServers: () => dispatch(getServers({ joined: true })),
		getServer: id => dispatch(getServer(id)),
		openModal: () => dispatch(openModal('server'))
	};
};

export default connect(msp, mdp)(ServerNav);
