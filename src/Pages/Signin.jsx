import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./login-signin.css";
import logo from "../Icons/JPEG/main-logo.jpeg";
import { Link } from "react-router-dom";
import { FormInput } from "../Components/Fields";

class SignIn extends Component {
  state = {
    username: [{ correct: true, value: "" }],
    email: [{ correct: true, value: "" }],
    password: [
      { correct: true, value: "Have at least one upper and lower case" },
      { correct: true, value: "Have at list one digit 0-9" },
      { correct: true, value: "Have length between 8 and 16" },
    ],
  };

  onSignInFormSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/" + "signin";
    // fetch the backend sign in

    const toJson = (form) => {
      var object = {};
      const data = new FormData(form);
      data.forEach((value, key) => (object[key] = value));
      return JSON.stringify(object);
    };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: toJson(e.target),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.result === true) {
          document.cookie = "token=" + result.token;
          alert(`Success!`);
        } else {
          alert(result.msg, result.reason);
        }
      })
      .catch((error) => {
        alert(`Connection Failed!`);
      });
  };

  passwordChange = () => {
    this.props.icon = this.props.icon === "eye" ? "eye-slashed" : "eye";
  };

  usernameCheck = (data) => {
    var temp;
    if (data.validity.patternMismatch)
      temp = [{ correct: false, value: "Can only have numbers and letters" }];
    else if (data.validity.valueMissing)
      temp = [{ correct: false, value: "Please fill the field up" }];
    else if (data.validity.valid) temp = [{ correct: true, value: "" }];
    this.setState({ username: temp });
  };

  emailCheck = (data) => {
    var temp;
    if (data.validity.valueMissing) {
      temp = [{ correct: false, value: "Please fill the field up" }];
    } else if (data.validity.typeMismatch)
      temp = [
        {
          correct: false,
          value: "the email should be form of example@exapmle.com",
        },
      ];
    else if (data.validity.valid) {
      temp = [{ correct: true, value: "" }];
    }
    this.setState({ email: temp });
  };

  passwordCheck = (data) => {
    // reset state
    var temp = this.state.password;
    temp.forEach((v) => (v.correct = false));
    if (data.validity.valid) temp.forEach((v) => (v.correct = true));
    else if (!data.validity.valueMissing && data.validity.patternMismatch) {
      if (/\d/.test(data.value)) {
        temp[1].correct = true;
      }
      if (/(?=.*[a-z])(?=.*[A-Z])/.test(data.value)) {
        temp[0].correct = true;
      }
      if (data.value.length >= 8 && data.value.length <= 16) {
        temp[2].correct = true;
      }
    }
    this.setState({ password: temp });
  };

  render() {
    return (
      <main className="form-signin w-100 m-auto form d-flex flex-column flex-lg-row p-2">
        <img
          src={logo}
          alt="Logo"
          className="align-self-center mb-2 mb-lg-0 me-lg-3"
        />
        <form
          className="align-self-lg-center"
          onSubmit={this.onSignInFormSubmit}
        >
          <FormInput
            id="username"
            type="text"
            icon="person"
            pattern="^[a-zA-Z]*\w+$"
            errorList={this.state.username}
            invalidCheck={this.usernameCheck}
            errorTitle="Username must: "
          >
            Username
          </FormInput>
          <FormInput
            id="email"
            type="email"
            icon="at"
            errorList={this.state.email}
            invalidCheck={this.emailCheck}
            errorTitle="Email must: "
          >
            Email Address
          </FormInput>
          <FormInput
            id="password"
            type="password"
            icon="eye"
            triggable={true}
            iconDisabled="eye-slash"
            typeDisabled="text"
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,16}$"
            onclick={this.passwordChange}
            invalidCheck={this.passwordCheck}
            errorList={this.state.password}
            errorTitle="Password must: "
          >
            Password
          </FormInput>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
          <Link to="/login" className="text-center d-block mt-1">
            Already have an account?
          </Link>
        </form>
      </main>
    );
  }
}

export default SignIn;
