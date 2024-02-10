import { Fragment } from "react";
import logo from "../Icons/PNG/main-logo.png";
import Button from "react-bootstrap/Button";

function isSet(text) {
  if (text === undefined) return 0;
  if (text === null) return 0;
  if (text.trim().length === 0) return 0;
  return 1;
}

function Detail({ fieldName, fieldValue }) {
  function PlaceholderedLabel({ text }) {
    return (
      <div className={"col " + (isSet(text) ? "" : "placeholder")}>
        {text || ""}
      </div>
    );
  }
  return (
    <div className="row py-1 placeholder-glow">
      <div className="col">{fieldName}: </div>
      <PlaceholderedLabel text={fieldValue} />
    </div>
  );
}

function Profile(props) {
  function Details({ list }) {
    return (
      <div
        className="container py-2 my-1 rounded-1"
        style={{ border: "1px solid black" }}
      >
        {list.map((item, index) => (
          <Detail {...item} key={index} />
        ))}
      </div>
    );
  }

  const items = [
    {
      head: "Account",
      icon: "person-circle",
      items: [
        { fieldName: "Username", fieldValue: props.user.username },
        { fieldName: "Email", fieldValue: props.user.email },
      ],
    },
    {
      head: "Personal Info",
      icon: "person-fill",
      items: [
        { fieldName: "First Name", fieldValue: props.user.firstName },
        { fieldName: "Last Name", fieldValue: props.user.lastName },
      ],
    },
  ];

  return (
    <main className="m-auto d-flex flex-column flex-lg-row">
      <img
        src={logo}
        alt="Logo"
        className="align-self-center mb-2 mb-lg-0 me-lg-3"
      />
      <div className="container bg-body-secondary rounded-2 py-3">
        {items.map(({ head, icon, items }, index) => (
          <Fragment key={index}>
            <strong>
              <i className={"px-2 bi bi-" + icon} />
              {head}:
            </strong>
            <Details list={items} />
          </Fragment>
        ))}
        <div className="row px-2">
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
