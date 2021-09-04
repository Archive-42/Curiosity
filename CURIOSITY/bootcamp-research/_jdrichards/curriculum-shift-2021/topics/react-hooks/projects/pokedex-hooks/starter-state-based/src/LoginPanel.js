import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';

class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@example.com',
      password: 'password',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/session`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    });

    if (response.ok) {
      const { token } = await response.json();
      this.props.updateToken(token);
      this.setState({ token });
    }
  }

  updateEmail = e => {
    this.setState({ email: e.target.value });
  }

  updatePassword = e => {
    this.setState({ password: e.target.value });
  }

  render() {
    const { token, email, password } = this.state;

    if (token) {
      return <Redirect to="/" />;
    }
    
    return (
      <main className="centered middled">
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                placeholder="Email"
                value={email}
                onChange={this.updateEmail} />
          <input type="password"
                placeholder="Password"
                value={password}
                onChange={this.updatePassword} />
          <button type="submit">Login</button>
        </form>
      </main>
    );
  }
}

export default LoginPanel;
