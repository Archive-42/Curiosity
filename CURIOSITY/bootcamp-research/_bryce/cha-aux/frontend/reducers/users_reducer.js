import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';
import { UPDATE_JOINED_SERVERS } from '../actions/server_actions';
import { UPDATE_JOINED_CHANNELS } from '../actions/channel_actions';

const usersReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			return merge({}, state, { [action.currentUser.id]: action.currentUser });
		case UPDATE_JOINED_SERVERS:
			const currentServerUserId = action.server.newMemberId || action.server.owner_id;
			const currentServerUser = state[currentServerUserId];
			const newJoinedServerIds = currentServerUser.joinedServerIds.concat(action.server.id);
			const newServerUser = merge({}, currentServerUser, { joinedServerIds: newJoinedServerIds });
			return merge({}, state, { [currentServerUserId]: newServerUser });
		case UPDATE_JOINED_CHANNELS:
			const currentChannelUserId = action.channel.userId;
			const currentChannelUser = state[currentChannelUserId];
			const newJoinedChannelIds = currentChannelUser.joinedChannelIds.concat(action.channel.id);
			const newChannelUser = merge({}, currentChannelUser, { joinedChannelIds: newJoinedChannelIds });
			return merge({}, state, { [currentChannelUserId]: newChannelUser });
		default:
			return state;
	}
};

export default usersReducer;
