import * as APIUtil from '../util/channel_api_util';
import { closeModal } from './modal_actions';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';
export const UPDATE_JOINED_CHANNELS = 'UPDATE_JOINED_CHANNELS';

const receiveChannels = channels => {
	return {
		type: RECEIVE_CHANNELS,
		channels
	};
};

const receiveChannel = channel => {
	return {
		type: RECEIVE_CHANNEL,
		channel
	};
};

const receiveChannelErrors = errors => {
	return {
		type: RECEIVE_CHANNEL_ERRORS,
		errors
	};
};

export const updateJoinedChannels = channel => {
	return {
		type: UPDATE_JOINED_CHANNELS,
		channel
	};
};

export const getChannels = filters => dispatch => {
	return APIUtil.getChannels(filters).then(channels =>
		dispatch(receiveChannels(channels), errors => dispatch(receiveChannelErrors(errors)))
	);
};

export const getChannel = id => dispatch => {
	return APIUtil.getChannel(id).then(channel =>
		dispatch(receiveChannel(channel), errors => dispatch(receiveChannelErrors(errors)))
	);
};

export const createChannel = channel => dispatch => {
	return APIUtil.createChannel(channel).then(
		channel => {
			dispatch(receiveChannel(channel));
			dispatch(closeModal());
			return dispatch(updateJoinedChannels(channel));
		},
		errors => {
			return dispatch(receiveChannelErrors(errors));
		}
	);
};

export const updateChannel = channel => dispatch => {
	return APIUtil.updateChannel(channel).then(
		channel => {
			dispatch(receiveChannel(channel));
			return dispatch(updateJoinedChannels(channel));
		},
		errors => {
			return dispatch(receiveChannelErrors(errors));
		}
	);
};

export const deleteChannel = id => dispatch => {
	return APIUtil.deleteChannel(id).then(channels =>
		dispatch(receiveChannels(channels), errors => dispatch(receiveChannelErrors(errors)))
	);
};
