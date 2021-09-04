import { connect } from 'react-redux';
import ServerIndex from './server_index';
import { getServers } from '../../actions/server_actions';

const msp = state => {
	return {
		servers: Object.values(state.entities.servers),
		serverIds: Object.keys(state.entities.servers)
	};
};

const mdp = dispatch => {
	return {
		getAllServers: () => dispatch(getServers())
	};
};

export default connect(msp, mdp)(ServerIndex);
