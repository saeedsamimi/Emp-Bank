import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./dashboard.css";

const items = ["Dashboard", "Users", "Messages", "Bookmark", "Files", "Stats"];
const icons = [
  ["grid"],
  ["person"],
  ["chat-right"],
  ["bookmark"],
  ["folder"],
  ["bar-chart"],
];

function sideBarItem(highlighted, onClick, i) {
  return (
    <a
      key={i}
      href=""
      className={"nav_link " + (highlighted ? "active" : "")}
      onClick={(e) => {
        e.preventDefault();
        onClick(i);
      }}
    >
      <i
        className={"nav_icon bi bi-" + icons[i] + (highlighted ? "-fill" : "")}
      ></i>
      <span className="nav_name">{items[i]}</span>
    </a>
  );
}

const helper = Array.from(Array(10).keys());

class Dashboard extends Component {
  state = {
    expanded: false,
    selected: this.props.index,
  };

  handleClickNavItems = (index) => {
    if (this.state.selected === index) {
      this.setState({ expanded: !this.state.expanded });
    } else {
      this.setState({ selected: index });
    }
  };

  render() {
    return (
      <div className="bg-light vh-100 d-flex w-100">
        <div
          className={"l-navbar " + (this.state.expanded && "show")}
          id="nav-bar"
        >
          <nav className="nav">
            <div>
              <div className="logo"></div>
              <div className="nav_list">
                {helper.map((i) =>
                  sideBarItem(
                    i === this.state.selected,
                    this.handleClickNavItems,
                    i
                  )
                )}
              </div>
            </div>
            <a href="#" className="nav_link">
              <i className="bi bi-door-closed nav_icon"></i>
              <span className="nav_name">SignOut</span>
            </a>
          </nav>
        </div>
        <div className="height-100 bg-light">
          <h4>Main Components</h4>
        </div>
      </div>
    );
  }
}

export default Dashboard;
