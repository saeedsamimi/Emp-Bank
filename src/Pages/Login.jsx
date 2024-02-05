import { Component } from "react";
import "./login-signin.css";
import logo from "../JPEG/main-logo.JPEG";
import { Link } from "react-router-dom";
import { LightInput } from "../Components/Fields";

class Login extends Component {
  state = {
    method: true,
    pass: { icon: "eye", type: "password" },
  };

  onLogInFormSubmit = async (e) => {
    e.preventDefault();
  };

  handlePassClick = () => {
    if (this.state.pass.type === "password") {
      this.setState({ pass: { icon: "eye-slash", type: "text" } });
    } else {
      this.setState({ pass: { icon: "eye", type: "password" } });
    }
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
            Sign In
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
