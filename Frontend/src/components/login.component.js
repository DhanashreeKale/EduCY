import React, { Component } from "react";
import loginpic from "../images/signin-image.jpg";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;
   
    const studLog = {
      student_username: username,
      student_password: password
    }
    
    axios.post("http://localhost:3000/api/students/login/receive", studLog
    )
      .then((response) => {
        console.log("res from login", response);
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <>
        <section className="sign-in">
          <div className="container1">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src={loginpic} alt="sign up image" />
                </figure>
              </div>
              <div className="signin-form">
                <h2 className="form-title">Login</h2>
                <form onSubmit={this.handleSubmit} className="register-form">
                  <div className="form-group">
                    <label htmlFor="username">
                      <i class="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="username"
                      name="username"
                      placeholder="Enter Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="agree-term"
                    />
                    <label htmlFor="remember-me" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      Remember me
                    </label>
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
