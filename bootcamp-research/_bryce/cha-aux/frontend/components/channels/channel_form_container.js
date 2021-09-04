import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { createChannel } from '../../actions/channel_actions';
import { clearErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
	return {
		errors: state.errors.channel,
		modalOpen: state.ui.modal.open && state.ui.modal.form === 'channel',
		serverId: ownProps.serverId
	};
};

const mdp = dispatch => {
	return {
		createChannel: channel => dispatch(createChannel(channel)),
		clearErrors: () => dispatch(clearErrors()),
		closeModal: () => dispatch(closeModal())
	};
};

export default connect(msp, mdp)(ChannelForm);
