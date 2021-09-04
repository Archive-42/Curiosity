import { connect } from 'react-redux';
import { register } from '../../actions/session_actions';
import RegisterForm from './register_form';

const mapStateToProps = state => {
	return {
		errors: state.errors.session,
		signup_email: state.session.signup_email || ''
	};
};

const mapDispatchToProps = dispatch => {
	return {
		register: user => dispatch(register(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
