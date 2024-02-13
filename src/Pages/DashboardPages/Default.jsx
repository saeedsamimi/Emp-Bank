import ToolBox from "../../Components/ToolBox";

function DafaultDashboard() {
  /* EmployeeManage */
  const handleEmp_create = () => {
    console.log("Create Emp clicked");
  };
  const handleEmp_edit = () => {
    console.log("Edit Emp clicked");
  };
  const handleEmp_report = () => {
    console.log("Report emp clicked");
  };
  const handleEmp_stats = () => {
    console.log("Statistics Emp clicked");
  };
  /* Work and Salary Manage */
  const hanldeSalary_report = () => {
    console.log("Report Salary clicked");
  };
  const handleSalary_stat = () => {
    console.log("Statistics Salary clicked");
  };
  const handleJob_create = () => {
    console.log("Job Create clicked");
  };
  const handleJob_manage = () => {
    console.log("Job manage clicked");
  };

  const Toolboxes = [
    {
      items: [
        {
          text: "Create Employee",
          icon: "plus-square",
          onClick: handleEmp_create,
        },
        {
          text: "Edit Employee",
          icon: "pencil-square",
          onClick: handleEmp_edit,
        },
        {
          text: "Report Employee",
          icon: "person-exclamation",
          onClick: handleEmp_report,
        },
        {
          text: "Stats Employee",
          icon: "clipboard2-data",
          onClick: handleEmp_stats,
        },
      ],
      head: "Manage Employee",
    },
    {
      items: [
        {
          text: "Report Salary",
          icon: "cash-coin",
          onClick: hanldeSalary_report,
        },
        {
          text: "Salary stats",
          icon: "pie-chart",
          onClick: handleSalary_stat,
        },
        {
          text: "Create Work",
          icon: "clipboard2-data",
          onClick: handleJob_create,
        },
        {
          text: "Manage Work",
          icon: "clipboard2-data",
          onClick: handleJob_manage,
        },
      ],
      head: "Manage Employee",
    },
  ];
  return <>{Toolboxes.map(ToolBox)}</>;
}
export default DafaultDashboard;
