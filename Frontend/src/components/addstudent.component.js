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

      errors: {},
    };

    this.changeFirstname = this.changeFirstname.bind(this);
    this.changeLastname = this.changeLastname.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePhoneNo = this.changePhoneNo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validateFirstname(value) {
    let error = null;
    const firstnameRegex = /^[a-zA-Z]+$/;

    if (!value) {
      error = "Firstname required.";
    } else if (!firstnameRegex.test(value)) {
      error = "Invalid firstname. Must contain alphabets only.";
    } else if (value.length < 3) {
      error = "Firstname should contain atleast three characters.";
    } else if (value.length > 50) {
      error = "Firstname should not exceed 50 characters.";
    }

    return error;
  }

  changeFirstname(event) {
    const { value } = event.target;

    const errors = this.state.errors;
    errors.firstname = this.validateFirstname(value);

    this.setState({
      firstname: value,
      errors,
    });
  }

  validateLastname(value) {
    let error = null;
    const lastnameRegex = /^[a-zA-Z]+$/;

    if (!value) {
      error = "Lastname required.";
    } else if (!lastnameRegex.test(value)) {
      error = "Invalid Lastname. Must contain alphabets only.";
    } else if (value.length < 3) {
      error = "Lastname should contain atleast three characters.";
    } else if (value.length > 50) {
      error = "Lastname should not exceed 50 characters.";
    }

    return error;
  }

  changeLastname(event) {
    const { value } = event.target;

    const errors = this.state.errors;
    errors.lastname = this.validateLastname(value);

    this.setState({
      lastname: value,
      errors,
    });
  }

  validateEmail(value) {
    let error = null;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!value) {
      error = "Email required.";
    } else if (
      !emailRegex.test(value) ||
      value.length < 10 ||
      value.length > 255
    ) {
      error = "Invalid Email.";
    }

    return error;
  }

  changeEmail(event) {
    const { value } = event.target;

    const errors = this.state.errors;
    errors.email = this.validateEmail(value);

    this.setState({
      email: value,
      errors,
    });
  }

  validatePhoneNo(value) {
    let error = null;
    const phoneNoRegex = /^[0-9\b]+$/;
    if (!value) {
      error = "Phone number required.";
    } else if (!phoneNoRegex.test(value)) {
      error = "Invalid phone number. Must contain digits only.";
    } else if (value.length !== 10) {
      error = "Invalid phone number.";
    }

    return error;
  }

  changePhoneNo(event) {
    const { value } = event.target;

    const errors = this.state.errors;
    errors.phoneNo = this.validatePhoneNo(value);

    this.setState({
      phoneNo: value,
      errors,
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
      .post("http://localhost:3000/api/students/send", registered)
      .then((response) => {
        console.log("RESPONSE RECEIVED: ", response);
        alert("Student added successfully!!!");
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        alert("Error!!!");
      });

    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      phoneNo: "",
    });
  }

  render() {
    const errors = this.state.errors;

    return (
      <>
        <section className="signup">
          <div className="container1 mt-5">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Add Student</h2>

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
                  <div>
                    {errors.firstname && (
                      <p style={{ color: "red" }}>{errors.firstname}</p>
                    )}
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
                  <div>
                    {errors.lastname && (
                      <p style={{ color: "red" }}>{errors.lastname}</p>
                    )}
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
                  <div>
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    )}
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
                  <div>
                    {errors.phoneNo && (
                      <p style={{ color: "red" }}>{errors.phoneNo}</p>
                    )}
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
                  <img src={signpic} alt="registrationPic" />
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
