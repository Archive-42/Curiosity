import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewUser(this.state)
      .then(() => this.props.history.push('/chirps'));
  }

  render () {
    return (
      <div className='session-form'>
        <h2>Sign Up!</h2>
        <form>
          <label>Username:
            <input
              onChange={this.handleInput('username')}
              type="text"
              value={this.state.username}
            />
          </label>
          <label>Email:
            <input
              onChange={this.handleInput('email')}
              type="text"
              value={this.state.email}
            />
          </label>
          <label>Password:
            <input
              onChange={this.handleInput('password')}
              type="password"
              value={this.state.password}
            />
          </label>
          <button onClick={this.handleSubmit}>Sign Up</button>
        </form>
      </div>
    );
  }
};

export default Signup;