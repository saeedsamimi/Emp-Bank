import React from "react";
import { Navigate } from "react-router-dom";

class PrivateRouter extends React.Component {
  state = {
    isAuthenticated: null,
    user: null,
  };

  componentDidMount() {
    this.setState({
      isAuthenticated: null,
      user: null,
    });
    fetch(import.meta.env.VITE_API_URL + "/Auth", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    })
      .then(async (result) => {
        if (result.ok) {
          const json = await result.json();
          this.setState({ isAuthenticated: true, user: json });
        } else this.setState({ isAuthenticated: false });
      })
      .catch(() => {
        this.setState({ isAuthenticated: false });
      });
  }

  render() {
    const { Component, ...props } = this.props;
    if (this.state.isAuthenticated === null) {
      return <a>Loading...</a>;
    } else {
      return this.state.isAuthenticated ? (
        <Component {...props} user={this.state.user} />
      ) : (
        <Navigate to="/login" />
      );
    }
  }
}

export default PrivateRouter;
