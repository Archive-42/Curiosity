import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.demoLogin = this.demoLogin.bind(this);
	}

	componentWillUnmount() {
		this.props.clearErrors();
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = Object.assign({}, this.state);
		this.props.processForm(user);
	}

	update(field) {
		return e => {
			this.setState({
				[field]: e.currentTarget.value
			});
		};
	}

	demoLogin(e) {
		e.preventDefault();
		this.props.demoLogin({ username: 'Bryce', email: 'bryce@gmail.com', password: 'notpassword' });
	}

	render() {
		let errorsList;
		if (this.props.errors.length) {
			errorsList = this.props.errors.map((error, idx) => {
				return <li key={idx}>{error}</li>;
			});
		}

		let formHeader;
		let buttonText;
		let usernameInput;
		let formFooter;
		if (this.props.formType === 'signup') {
			formHeader = (
				<div className="session-form-header">
					<h1>Create an account</h1>
				</div>
			);
			buttonText = 'Continue';
			usernameInput = (
				<div className="session-form-input-username">
					<label>Username</label>
					<input type="text" value={this.state.username} onChange={this.update('username')} />
				</div>
			);
			formFooter = (
				<div className="session-form-footer">
					<Link to="/login">Already have an account?</Link>
					<p>&nbsp;or&nbsp;</p>
					<button onClick={this.demoLogin} className="demo-button">
						View a Demo Account
					</button>
				</div>
			);
		} else {
			formHeader = (
				<div className="session-form-header">
					<h1>Welcome back!</h1>
					<h3>We're so excited to see you again!</h3>
				</div>
			);
			buttonText = 'Login';

			formFooter = (
				<div className="session-form-footer">
					<p>Need an account?</p>
					<Link to="/signup">&nbsp;Register</Link>
					<p>&nbsp;or&nbsp;</p>
					<button onClick={this.demoLogin} className="demo-button">
						View a Demo Account
					</button>
				</div>
			);
		}

		return (
			<div className="session-background">
				<div className="session-form-container">
					<div className="session-form-logo">cha-aux</div>
					<form className="session-form" onSubmit={this.handleSubmit}>
						{formHeader}
						<div className="session-form-input-email">
							<label>Email</label>
							<input type="text" value={this.state.email} onChange={this.update('email')} />
						</div>
						{usernameInput}
						<div className="session-form-input-password">
							<label>Password</label>
							<input type="password" value={this.state.password} onChange={this.update('password')} />
						</div>
						<ul className="session-errors-list">{errorsList}</ul>
						<input type="submit" value={buttonText} />
						{formFooter}
					</form>
				</div>
			</div>
		);
	}
}

export default SessionForm;
