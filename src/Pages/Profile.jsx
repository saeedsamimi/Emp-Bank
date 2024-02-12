import { Component, useState } from "react";
import { Button, InputGroup, Form, Tab, Tabs } from "react-bootstrap";

function PasswordField({ name, id, label }) {
  const [hidden, setHidden] = useState(true);

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id={id}>{label}:</InputGroup.Text>
      <Form.Control
        name={name}
        required
        aria-describedby={id}
        type={hidden ? "password" : "text"}
      />
      <InputGroup.Text onClick={() => setHidden(!hidden)}>
        <i className={"bi bi-" + (hidden ? "eye" : "eye-slash")}></i>
      </InputGroup.Text>
    </InputGroup>
  );
}

class Profile extends Component {
  state = {
    currentTab: "Account",
    message: "",
    nameMessage: "",
    isNameEdit: false,
    firstname: this.props.user.firstname,
    lastname: this.props.user.lastname,
  };

  handleChangePassFormSubmit = (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL + "/changepass";
    fetch(url, {
      method: "POST",
      body: new FormData(e.target),
      headers: {
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    })
      .then((response) => {
        if (response.ok) alert("changed!");
        return response.text();
      })
      .then((result) => {
        this.setState({ message: result });
      })
      .catch((err) => this.setState({ message: err.message || err.code }));
  };

  handleRename = (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL + "/rename";
    fetch(url, {
      method: "POST",
      body: new FormData(e.target),
      headers: {
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const result = await res.json();
          this.setState({
            nameMessage: "Your name changed successfully!",
            firstname: result.firstname,
            lastname: result.lastname,
          });
        } else {
          const result = await res.text();
          this.setState({
            nameMessage: result,
          });
        }
      })
      .catch((err) => {
        this.setState({
          nameMessage: "Error occured: (" + err.message || err.code + ")",
        });
      });
  };

  isChanged() {
    return !(
      this.props.user.firstname === this.state.firstname &&
      this.props.user.lastname === this.state.lastname
    );
  }

  isEmpty() {
    return Boolean(this.state.firstname || this.state.lastname);
  }

  render() {
    return (
      <main className="w-100">
        <div className="container" style={{ maxWidth: "600px" }}>
          <Button variant="primary" onClick={() => window.history.back()}>
            <i className="bi bi-arrow-left" />
          </Button>
          <div className="bg-body-secondary rounded-2 px-4 py-2">
            <Tabs
              defaultActiveKey={this.state.currentTab}
              id="profile-tabs"
              className="mb-3 flex-row"
              onSelect={(e) => this.setState({ currentTab: e })}
              fill
            >
              <Tab
                eventKey="Account"
                title={
                  <>
                    <i className="bi bi-person-fill pe-1" />
                    Account
                  </>
                }
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text id="username-lbl">Username:</InputGroup.Text>
                  <Form.Control
                    id="username"
                    readOnly
                    aria-describedby="username-lbl"
                    defaultValue={this.props.user.username}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Text id="email-lbl">Email:</InputGroup.Text>
                  <Form.Control
                    id="email"
                    readOnly
                    aria-describedby="email-lbl"
                    defaultValue={this.props.user.email}
                  />
                </InputGroup>
              </Tab>
              <Tab
                eventKey="Personal"
                title={
                  <>
                    <i className="bi bi-person-circle pe-1" />
                    Personal
                  </>
                }
              >
                <Form method="POST" onSubmit={this.handleRename}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="fname-lbl">
                      First Name:
                    </InputGroup.Text>
                    <Form.Control
                      id="fname"
                      name="firstname"
                      aria-describedby="fname-lbl"
                      defaultValue={this.state.firstname}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="lname-lbl">Last Name:</InputGroup.Text>
                    <Form.Control
                      id="lname"
                      name="lastname"
                      aria-describedby="lname-lbl"
                      defaultValue={this.state.lastname}
                      required
                    />
                  </InputGroup>
                  {this.isEmpty() || (
                    <li className="text-danger">
                      The name is not set please set it!
                    </li>
                  )}
                  {this.state.nameMessage !== "" && (
                    <li className="text-success">{this.state.nameMessage}</li>
                  )}
                  <Button
                    variant="primary"
                    className="mt-2"
                    type="submit"
                    onClick={this.handleChangeNameEdit}
                  >
                    Edit
                  </Button>
                </Form>
              </Tab>
              <Tab
                eventKey="Password"
                title={
                  <>
                    <i className="bi bi-key-fill pe-1" />
                    Password
                  </>
                }
              >
                <Form method="POST" onSubmit={this.handleChangePassFormSubmit}>
                  <PasswordField
                    id="curr-pass-lbl"
                    name="password"
                    label="Current Password"
                  />
                  <PasswordField
                    id="new-pass-lbl"
                    name="newpass"
                    label="New Password"
                  />
                  <PasswordField
                    id="repeat-pass-lbl"
                    name="repeatpass"
                    label="Repeat Password"
                  />
                  <Button type="submit" variant="primary">
                    Change Password
                  </Button>
                </Form>
              </Tab>
            </Tabs>
            <p>{this.state.message}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Profile;
