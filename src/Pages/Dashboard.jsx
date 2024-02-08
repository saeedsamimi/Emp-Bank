import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./dashboard.css";
import Navbar from "../Components/Navbar";
import ToolBox from "../Components/ToolBox";

const items = [
  { text: "Dashboard", icon: "grid" },
  { text: "Users", icon: "person" },
  { text: "Messages", icon: "chat-right" },
  { text: "Bookmark", icon: "bookmark" },
  { text: "Files", icon: "folder" },
  { text: "Stats", icon: "bar-chart" },
];

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
  /* EmployeeManage */
  handleEmp_create = () => {
    console.log("Create Emp clicked");
  };
  handleEmp_edit = () => {
    console.log("Edit Emp clicked");
  };
  handleEmp_report = () => {
    console.log("Report emp clicked");
  };
  handleEmp_stats = () => {
    console.log("Statistics Emp clicked");
  };
  /* Work and Salary Manage */
  hanldeSalary_report = () => {
    console.log("Report Salary clicked");
  };
  handleSalary_stat = () => {
    console.log("Statistics Salary clicked");
  };
  handleJob_create = () => {
    console.log("Job Create clicked");
  };
  handleJob_manage = () => {
    console.log("Job manage clicked");
  };

  Toolboxes = [
    {
      items: [
        {
          text: "Create Employee",
          icon: "plus-square",
          onClick: this.handleEmp_create,
        },
        {
          text: "Edit Employee",
          icon: "pencil-square",
          onClick: this.handleEmp_edit,
        },
        {
          text: "Report Employee",
          icon: "person-exclamation",
          onClick: this.handleEmp_report,
        },
        {
          text: "Stats Employee",
          icon: "clipboard2-data",
          onClick: this.handleEmp_stats,
        },
      ],
      head: "Manage Employee",
    },
    {
      items: [
        {
          text: "Report Salary",
          icon: "cash-coin",
          onClick: this.hanldeSalary_report,
        },
        {
          text: "Salary stats",
          icon: "pie-chart",
          onClick: this.handleSalary_stat,
        },
        {
          text: "Create Work",
          icon: "clipboard2-data",
          onClick: this.handleJob_create,
        },
        {
          text: "Manage Work",
          icon: "clipboard2-data",
          onClick: this.handleJob_manage,
        },
      ],
      head: "Manage Employee",
    },
  ];

  render() {
    return (
      <div className="bg-light vh-100 d-flex w-100">
        <Navbar
          items={items}
          selected={this.state.selected}
          expanded={this.state.expanded}
          onItemClick={this.handleClickNavItems}
        />
        <main className="height-100 bg-light dashboard w-100">
          <header
            className={
              "text-white d-flex flex-row justify-content-between bg-primary" +
              (this.state.expanded ? " open" : "")
            }
          >
            <i
              className={"bi bi-" + (this.state.expanded ? "x-lg" : "list")}
              onClick={() => this.setState({ expanded: !this.state.expanded })}
            ></i>
            <div className="header-logo"></div>
            <i className="bi bi-three-dots-vertical"></i>
          </header>
          <div className="main-view">{this.Toolboxes.map(ToolBox)}</div>
        </main>
      </div>
    );
  }
}

export default Dashboard;
