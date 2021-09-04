import React from "react";
import UserContext from "../../contexts/UserContext";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  updateUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  registerUser = async (e) => {
    e.preventDefault();

    // Send a POST request to create a user
    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      if (!res.ok) {
        throw res;
      }
      const contents = await res.json();

      console.log(contents.token, contents.user.id);
      this.props.updateContext(contents.token, contents.user.id);
    } catch (e) {
      console.log("Error Caught!!");
      console.error(e);
    }
  };

  render() {
    const { username, password, email } = this.state;
    return (
      <form>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Enter Username..."
          value={username}
          onChange={this.updateUsername}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email..."
          value={email}
          onChange={this.updateEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password..."
          value={password}
          onChange={this.updatePassword}
        />

        <button type="submit" onClick={this.registerUser}>
          Sign Up
        </button>
      </form>
    );
  }
}

const RegistrationFormWithContext = () => {
  return (
    <UserContext.Consumer>
      {(value) => {
        return <RegistrationForm {...value} />;
      }}
    </UserContext.Consumer>
  );
};

export default RegistrationFormWithContext;
