import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import logo from "../Icons/PNG/main-logo-black-transparent.png";
import "./dashboard.css";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Users from "./DashboardPages/Users";
import DafaultDashboard from "./DashboardPages/Default";
import * as PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Toast, ToastContainer } from "react-bootstrap";

function Dashboard({ user }) {
  const navigator = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const [toastProps, setToastProps] = useState({
    show: false,
    title: "",
    mode: "danger",
    body: "",
  });
  const [modalState, setModalState] = useState({
    isShown: false,
    title: "",
    body: "",
    button: "",
    onClick: () => {},
  });

  const items = [
    {
      text: "Dashboard",
      icon: "grid",
      component: DafaultDashboard,
    },
    { text: "Users", icon: "person", component: Users },
    { text: "Messages", icon: "chat-right", component: Users },
    { text: "Bookmark", icon: "bookmark", component: Users },
    { text: "Files", icon: "folder", component: Users },
    { text: "Stats", icon: "bar-chart", component: Users },
  ];

  const handleClickNavItems = (index) => {
    if (index === selected) setExpanded(!expanded);
    else setSelected(index);
  };
  /* handling the logout operation */
  const handleLogout = () => {
    document.cookie = "token=;";
    window.location.reload();
  };

  const handleCloseModal = () => {
    setModalState({ isShown: false });
  };

  const CurrentComponent = items[selected].component;

  return (
    <>
      <Modal
        show={modalState.isShown}
        keyboard={false}
        backdrop="static"
        onHide={handleCloseModal}
      >
        <Modal.Header>
          <Modal.Title>{modalState.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalState.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={modalState.onClick}>
            {modalState.button}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="bg-light vh-100 d-flex w-100">
        <Navbar
          items={items}
          selected={selected}
          expanded={expanded}
          onItemClick={handleClickNavItems}
        />
        <main className="height-100 bg-light dashboard w-100">
          <header
            className={
              "text-white d-flex flex-row justify-content-between bg-primary" +
              (expanded ? " open" : "")
            }
          >
            <i
              className={"bi bi-" + (expanded ? "x-lg" : "list")}
              onClick={() => setExpanded(!expanded)}
            ></i>
            <div className="header-logo"></div>
            <div className="dropdown">
              <button
                className="btn text-white dropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul className="dropdown-menu">
                <img className="dropdown-header w-100" src={logo} />
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <i className="bi bi-person"></i>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/setting">
                    <i className="bi bi-gear"></i>
                    Setting
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item text-danger"
                    href=""
                    onClick={handleLogout}
                  >
                    <i className="bi bi-door-closed"></i>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </header>
          <div className="main-view">
            <CurrentComponent
              user={user}
              setModal={setModalState}
              setToast={setToastProps}
              navigator={navigator}
            />
          </div>
        </main>
      </div>
      <ToastContainer
        position="bottom-end"
        style={{ zIndex: 1000 }}
        className="p-3"
      >
        <Toast
          onClose={() => setToastProps({ show: false })}
          show={toastProps.show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <i
              className={"me-2 bi bi-info-circle-fill text-" + toastProps.mode}
            />
            <strong>{toastProps.title}</strong>
          </Toast.Header>
          <Toast.Body>{toastProps.body}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

Dashboard.propTypes = {
  index: PropTypes.number,
};

export default Dashboard;
