import { connect } from 'react-redux';
import ServerForm from './server_form';
import { createServer } from '../../actions/server_actions';
import { clearErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

const msp = state => {
	return {
		errors: state.errors.server,
		modalOpen: state.ui.modal.open && state.ui.modal.form === 'server'
	};
};

const mdp = dispatch => {
	return {
		createServer: server => dispatch(createServer(server)),
		clearErrors: () => dispatch(clearErrors()),
		closeModal: () => dispatch(closeModal())
	};
};

export default connect(msp, mdp)(ServerForm);
