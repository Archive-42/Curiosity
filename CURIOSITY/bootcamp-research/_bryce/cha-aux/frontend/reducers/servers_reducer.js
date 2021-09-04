import { RECEIVE_SERVER, RECEIVE_SERVERS } from '../actions/server_actions';
import { UPDATE_JOINED_CHANNELS } from '../actions/channel_actions';
import { merge } from 'lodash';

const serversReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_SERVERS:
			return action.servers;
		case RECEIVE_SERVER:
			return merge({}, state, { [action.server.id]: action.server });
		case UPDATE_JOINED_CHANNELS:
			let updatedChannels = state[action.channel.serverId].channelIds.concat(action.channel.id);
			let updatedServer = merge({}, state[action.channel.serverId], { channelIds: updatedChannels });
			return merge({}, state, { [action.channel.serverId]: updatedServer });
		default:
			return state;
	}
};

export default serversReducer;
