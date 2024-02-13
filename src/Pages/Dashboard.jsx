import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import logo from "../Icons/PNG/main-logo-black-transparent.png";
import "./dashboard.css";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import Users from "./DashboardPages/Users";
import DafaultDashboard from "./DashboardPages/Default";
import * as PropTypes from "prop-types";

function Dashboard({ user }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);

  const items = [
    {
      text: "Dashboard",
      icon: "grid",
      component: <DafaultDashboard user={user} />,
    },
    { text: "Users", icon: "person", component: <Users user={user} /> },
    { text: "Messages", icon: "chat-right", component: <Users user={user} /> },
    { text: "Bookmark", icon: "bookmark", component: <Users user={user} /> },
    { text: "Files", icon: "folder", component: <Users user={user} /> },
    { text: "Stats", icon: "bar-chart", component: <Users user={user} /> },
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

  return (
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
        <div className="main-view">{items[selected].component}</div>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  index: PropTypes.number,
};

export default Dashboard;
