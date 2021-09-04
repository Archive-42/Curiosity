import React from 'react';
import { withRouter } from 'react-router-dom';

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: this.props.signup_email,
			full_name: '',
			password: ''
		};

		this.password_ref = React.createRef();

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		let user = {
			email: this.state.email,
			full_name: this.state.full_name,
			password: this.state.password,
			password2: this.state.password
		};

		this.props.register(user, this.props.history);
	}

	render() {
		const show_password_label = this.state.password_focus || this.state.password;
		const show_full_name_label = this.state.full_name_focus || this.state.full_name;

		return (
			<div className="register">
				<form onSubmit={this.handleSubmit} className="register__form">
					<div className="register__form__logo" />
					<h1 className="register__form__headline">Welcome</h1>
					<p className="register__form__subhead">Create an account</p>
					<div className="register__form__email">
						<div className={`register__form__email_label show`}>Email address</div>
						<input type="text" value={this.state.email} onChange={() => {}} placeholder="" disabled={true} />
						{this.props.errors.email ? <p className="error">{this.props.errors.email}</p> : null}
						<div className="register__form__email_edit" onClick={() => this.props.history.push('/login')}>
							<i className={`fas fa-pencil-alt`} />
						</div>
					</div>

					<div className={`register__form__full_name ${this.state.full_name_focus ? 'focused' : 'unfocused'}`}>
						<div className={`register__form__full_name_label ${show_full_name_label ? 'show' : ''} `}>Full name</div>
						<input
							className={`${show_full_name_label ? 'show' : ''} `}
							type="text"
							value={this.state.full_name}
							onChange={this.update('full_name')}
							placeholder={show_full_name_label ? '' : 'Your full name'}
							onFocus={() => this.setState({ full_name_focus: true })}
							onBlur={() => this.setState({ full_name_focus: false })}
							autoFocus={true}
						/>
						{this.props.errors.full_name ? <p className="error">{this.props.errors.full_name}</p> : null}
					</div>

					<div className={`register__form__password ${this.state.password_focus ? 'focused' : 'unfocused'}`}>
						<div className={`register__form__password_label ${show_password_label ? 'show' : ''} `}>Password</div>
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
					<input type="submit" value="Sign Up" className="register__form__submit" />
				</form>
			</div>
		);
	}
}

export default withRouter(RegisterForm);
