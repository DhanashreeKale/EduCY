import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import signpic from "../images/signup-image.jpg";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phoneNo: "",
    };
    this.changeFirstname = this.changeFirstname.bind(this);
    this.changeLastname = this.changeLastname.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePhoneNo = this.changePhoneNo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeFirstname(event) {
    this.setState({
      firstname: event.target.value,
    });
  }

  changeLastname(event) {
    this.setState({
      lastname: event.target.value,
    });
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  changePhoneNo(event) {
    this.setState({
      phoneNo: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const registered = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phoneNo: this.state.phoneNo,
    };
    axios
      .post("http://localhost:3000/api/teachers", registered)
      .then((response) => {
        console.log("RESPONSE RECEIVED: ", response);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });

    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      phoneNo: "",
    });
  }

  render() {
    return (
      <>
        <section className="signup">
          <div className="container1 mt-5">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Add Teacher</h2>

                <form className="register-form" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstname">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      onChange={this.changeFirstname}
                      value={this.state.firstname}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastname">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      onChange={this.changeLastname}
                      value={this.state.lastname}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter E-mail"
                      onChange={this.changeEmail}
                      value={this.state.email}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Phone Number"
                      onChange={this.changePhoneNo}
                      value={this.state.phoneNo}
                      required
                    />
                  </div>

                  <div className="form-group form-button">
                    <input
                      type="submit"
                      className="btn btn-primary btn-lg form-submit"
                      value="Add"
                    />
                  </div>
                </form>
              </div>

              <div className="signup-image">
                <figure>
                  <img src={signpic} alt="registration pic" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Signup;
