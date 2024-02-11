import { Component } from "react";
import "./login-signin.css";
import logo from "../Icons/JPEG/main-logo.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LightInput } from "../Components/Fields";

class Login extends Component {
  state = {
    method: true,
    pass: { icon: "eye", type: "password" },
    loggedIn: false,
  };

  onLogInFormSubmit = async (e) => {
    e.preventDefault();
    const toJson = (form) => {
      var object = {};
      const data = new FormData(form);
      data.forEach((value, key) => (object[key] = value));
      return JSON.stringify(object);
    };
    const url = import.meta.env.VITE_API_URL + "/login";
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
          this.setState({ loggedIn: true });
        } else {
          alert(result.msg, result.reason);
        }
      })
      .catch((error) => {
        alert(`Connection Failed!`);
      });
  };

  handlePassClick = () => {
    if (this.state.pass.type === "password") {
      this.setState({ pass: { icon: "eye-slash", type: "text" } });
    } else {
      this.setState({ pass: { icon: "eye", type: "password" } });
    }
  };

  render() {
    return this.state.loggedIn ? (
      <Navigate to="/dashboard" />
    ) : (
      <main className="form-signin w-100 m-auto form d-flex flex-column flex-lg-row p-2">
        <img
          src={logo}
          alt="Logo"
          className="align-self-center mb-2 mb-lg-0 me-lg-3"
        />
        <form
          className="align-self-lg-center"
          onSubmit={this.onLogInFormSubmit}
        >
          <div className="mb-3">
            <div className="input-group my-1">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="method"
                  name="method"
                  aria-label="Authenticate method"
                  onChange={() => this.setState({ method: !this.state.method })}
                  defaultValue={this.state.method ? 0 : 1}
                >
                  <option value="0">Username</option>
                  <option value="1">Email</option>
                </select>
                <label htmlFor="method">Works with selects</label>
              </div>
            </div>
          </div>
          <LightInput
            id={this.state.method ? "username" : "email"}
            type={this.state.method ? "text" : "email"}
            icon={this.state.method ? "person" : "at"}
          >
            {this.state.method ? "Username" : "Email"}
          </LightInput>
          <LightInput
            id="password"
            type={this.state.pass.type}
            icon={this.state.pass.icon}
            onClick={this.handlePassClick}
          >
            Password
          </LightInput>
          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
          <Link to="/signin" className="text-center d-block mt-1">
            Dont have account?
          </Link>
          <Link to="/forgot" className="text-center d-block mt-1">
            Forgot your password?
          </Link>
        </form>
      </main>
    );
  }
}

export default Login;
