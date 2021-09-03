import React, { Component } from "react";
import loginpic from "../images/signin-image.jpg";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",

      errors: {},
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validateUsername(value) {
    let error = null;
    const usernameRegex = /^(?=[a-zA-Z.]{8,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (!value) {
      error = "Username required.";
    } else if (!usernameRegex.test(value)) {
      error = "Invalid Username.";
    }

    return error;
  }

  changeUsername(event) {
    const { value } = event.target;

    const errors = this.state.errors;
    errors.username = this.validateUsername(value);

    this.setState({
      username: value,
      errors,
    });
  }

  validatePassword(value) {
    let error = null;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z]).{8,8}$/;

    if (!value) {
      error = "Password required.";
    } else if (!passwordRegex.test(value)) {
      error = "Invalid Password.";
    }

    return error;
  }

  changePassword(event) {
    const { value } = event.target;

    const errors = this.state.errors;
    errors.password = this.validatePassword(value);

    this.setState({
      password: value,
      errors,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;

    const studLog = {
      student_username: username,
      student_password: password,
    };

    axios
      .post("http://localhost:3000/api/students/login/receive", studLog)
      .then((response) => {
        console.log("RESPONSE RECEIVED: ", response);
        alert("Login successful!!!");
      })
      .catch((error) => {
        console.log("AXIOS ERROR: ", error);
        alert("Error!!!");
      });

    this.setState({
      username: "",
      password: "",
    });
  }

  render() {
    const errors = this.state.errors;

    return (
      <>
        <section className="sign-in">
          <div className="container1">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src={loginpic} alt="signupPic" />
                </figure>
              </div>
              <div className="signin-form">
                <h2 className="form-title">Login</h2>
                <form onSubmit={this.onSubmit} className="register-form">
                  <div className="form-group">
                    <label htmlFor="username">
                      <i class="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      onChange={this.changeUsername}
                      value={this.state.username}
                      required
                    />
                  </div>
                  <div>
                    {errors.username && (
                      <p style={{ color: "red" }}>{errors.username}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      onChange={this.changePassword}
                      value={this.state.password}
                      required
                    />
                  </div>
                  <div>
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                  </div>

                  <div class="form-group form-button">
                    <input
                      type="Submit"
                      className="btn btn-primary btn-lg form-submit"
                      value="Login"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
