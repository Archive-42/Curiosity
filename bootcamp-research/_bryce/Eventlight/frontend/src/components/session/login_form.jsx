import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/login.css';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			page: 1,
			email_focus: false,
			password_focus: false,
			reveal_password: false
		};

		this.email_ref = React.createRef();
		this.password_ref = React.createRef();

		this.demoLogin = this.demoLogin.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// Handle field updates (called in the render method)
	update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	demoLogin(event) {
		event.preventDefault();
		const demoUser = {
			email: 'demouser@gmail.com',
			password: 'password'
		};
		this.props.login(demoUser);
	}

	// Handle form submission
	handleSubmit(e) {
		e.preventDefault();

		if (this.state.page === 2) {
			let user = {
				email: this.state.email,
				password: this.state.password
			};
			this.props.login(user);
		} else {
			this.setState({ page: 2 });
			this.props.checkForExistingEmail(this.state.email).then(exists => {
				if (!exists) this.props.history.push('/register');
			});
		}
	}

	render() {
		let headline, subhead, button_label, page;

		const show_email_label = this.state.email_focus || this.state.email;

		const show_password_label = this.state.password_focus || this.state.password;

		const show_edit_email_icon_class =
			this.state.page === 1 ? 'login__form__email_edit_hidden' : 'login__form__email_edit_show';

		if (this.state.page === 1) {
			page = 'first';
			headline = "Let's get started";
			subhead = 'Enter your email to get started.';
			button_label = 'Get Started';
		} else {
			page = 'second';
			headline = 'Welcome back';
			subhead = 'Please enter your password to log in.';
			button_label = 'Log In';
		}
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login__form">
					<div className={`login__form__logo ${page}`} />
					<h1 className="login__form__headline">{headline}</h1>
					<p className="login__form__subhead">{subhead}</p>
					<div className={`login__form__email ${page}`}>
						<div className={`login__form__email_label ${show_email_label ? 'show' : ''} `}>Email address</div>
						<input
							ref={this.email_ref}
							className={`${show_email_label ? 'show' : ''} `}
							type="text"
							value={this.state.email}
							onChange={this.update('email')}
							placeholder={show_email_label ? '' : 'Email address'}
							onFocus={() => this.setState({ email_focus: true })}
							onBlur={() => this.setState({ email_focus: false })}
							disabled={this.state.page !== 1}
						/>
						{this.props.errors.email ? <p className="error">{this.props.errors.email}</p> : null}
						<div
							className={show_edit_email_icon_class}
							onClick={() =>
								this.setState({
									page: this.state.page === 1 ? 2 : 1
								})}
						>
							<i className={`fas fa-pencil-alt`} />
						</div>
					</div>
					<div className={`login__form__password ${page} ${this.state.password_focus ? 'focused' : 'unfocused'}`}>
						<div className={`login__form__password_label ${show_password_label ? 'show' : ''} `}>Password</div>
						<input
							ref={this.password_ref}
							className={`${show_password_label ? 'show' : ''} `}
							type={this.state.reveal_password ? 'text' : 'password'}
							value={this.state.password}
							onChange={this.update('password')}
							placeholder={show_password_label ? '' : 'Password'}
							onFocus={() => this.setState({ password_focus: true })}
							onBlur={() => this.setState({ password_focus: false })}
						/>
						{this.props.errors.password ? <p className="error">{this.props.errors.password}</p> : null}
						<div
							className="password_icon"
							onClick={() => {
								this.setState({
									reveal_password: !this.state.reveal_password
								});
								this.password_ref.current.focus();
							}}
						>
							{this.state.reveal_password ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
						</div>
					</div>
					<input type="submit" value={button_label} className="login__form__submit" />
				</form>
				<div className="demo-login-container">
					<p className="demo-login-p">or</p>
					<button className="demo-login-button" onClick={this.demoLogin}>
						Demo Login
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(LoginForm);
