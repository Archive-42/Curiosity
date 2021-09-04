import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';
import {connect} from "react-redux";
import {login} from "./store/authentication";

class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@example.com',
      password: 'password',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password)
  }

  updateEmail = e => {
    this.setState({ email: e.target.value });
  }

  updatePassword = e => {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.props.authentication.token) {
      return <Redirect to="/" />;
    }
    return (
      <main className="centered middled">
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.updateEmail} />
          <input type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.updatePassword} />
          <button type="submit">Login</button>
        </form>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {authentication: state.authentication
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

// Yes, this looks funny, but you will often
// see this kind of indentation in others'
// code when using React and Redux.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  LoginPanel
);
