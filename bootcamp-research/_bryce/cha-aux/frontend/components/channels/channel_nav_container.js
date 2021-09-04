import { connect } from 'react-redux';
import ChannelNav from './channel_nav';
import { getChannels, getChannel } from '../../actions/channel_actions';
import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
	let currentServerId;
	let currentChannelId;
	let joinedChannelIds;
	let joinedChannels = {};
	if (ownProps.currentServerId && state.entities.servers[ownProps.currentServerId]) {
		currentServerId = ownProps.currentServerId;
		const serverChannelIds = state.entities.servers[currentServerId].channelIds;
		joinedChannelIds = state.entities.users[state.session.id].joinedChannelIds.filter(id =>
			serverChannelIds.includes(id)
		);
		joinedChannelIds.forEach(id => {
			if (Object.keys(state.entities.channels).includes(id.toString())) {
				joinedChannels[id] = state.entities.channels[id];
			}
		});
		currentChannelId = joinedChannelIds.first;
	}

	return {
		joinedChannelIds,
		joinedChannels,
		currentServerId,
		currentServer: state.entities.servers[currentServerId],
		currentChannelId,
		currentChannel: state.entities.channels[currentChannelId],
		fetchedChannels: state.entities.channels,
		fetchedChannelIds: Object.keys(state.entities.channels),
		currentUserId: state.session.id
	};
};

const mdp = dispatch => {
	return {
		getServerChannels: server_id => dispatch(getChannels({ server_id })),
		getChannel: id => dispatch(getChannel(id)),
		openModal: () => dispatch(openModal('channel'))
	};
};

export default connect(msp, mdp)(ChannelNav);
