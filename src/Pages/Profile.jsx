import { Component, Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

class Profile extends Component {
  state = {
    isEditing: [false, false, false],
  };

  Detail = ({ fieldName, fieldValue }, key) => {
    return (
      <div className="row py-1">
        {this.state[key] && "ok"}
        <label className="col">{fieldName}: </label>
        <div className="col ">{fieldValue}</div>
      </div>
    );
  };

  setEditing(index) {
    this.setState({
      isEditing: this.state.isEditing.map((v, i) => i === index && !v),
    });
  }

  items = [
    {
      head: "Account",
      readonly: true,
      icon: "person-circle",
      items: [
        { fieldName: "Username", fieldValue: this.props.user.username },
        { fieldName: "Email", fieldValue: this.props.user.email },
      ],
    },
    {
      head: "Personal Info",
      readonly: false,
      icon: "person-fill",
      items: [
        { fieldName: "First Name", fieldValue: this.props.user.firstName },
        { fieldName: "Last Name", fieldValue: this.props.user.lastName },
      ],
    },
    {
      head: "Password",
      readonly: false,
      icon: "key-fill",
      items: [
        {
          fieldName: "Current Password",
          fieldValue: this.props.user.firstName,
        },
        { fieldName: "New Password", fieldValue: this.props.user.lastName },
        {
          fieldName: "Repeat Password",
          fieldValue: this.props.user.lastName,
        },
      ],
    },
  ];

  render() {
    return (
      <main className="w-100">
        <div className="container bg-body-secondary rounded-2 px-4 py-2">
          <Stack direction="horizontal" className="p-1">
            <Button variant="primary">
              <i className="bi bi-arrow-left" />
            </Button>
            <Button className="ms-auto" variant="primary">
              Save
            </Button>
          </Stack>
          <div className="row gap-1 row-cols-4">
            {this.items.map(({ readonly, head, icon, items }, index) => (
              <div
                key={index}
                className="p-2 rounded-1 col"
                style={{ border: "1px solid black" }}
              >
                <strong className="d-flex justify-content-between">
                  <div>
                    <i className={"px-1 py-2 bi bi-" + icon} />
                    {head}:
                  </div>
                  {readonly || (
                    <i
                      className={
                        "bi bi-" +
                        (this.state.isEditing[index] ? "x-lg" : "pencil-square")
                      }
                      onClick={() => this.setEditing(index)}
                    />
                  )}
                </strong>
                <div>{items.map(this.Detail)}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
}

export default Profile;
