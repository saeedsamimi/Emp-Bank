import ToolBox from "../../Components/ToolBox";
import { useEffect, useState, useTransition } from "react";

const url = import.meta.env.VITE_API_URL + "/fetchEmployees";

function DafaultDashboard({ user, setModal, navigator }) {
  const [employees, setEmployees] = useState([]);
  const [isPending, startTransition] = useTransition();
  useEffect(function () {
    startTransition(async function () {
      try {
        const result = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie.split("=")[1],
          },
          mode: "cors",
        });
        if (result.ok) {
          const emps = await result.json();
          setEmployees(emps);
        } else if (result.status === 403) {
          setModal({
            isShown: true,
            title: "error while fetching data",
            body: "Your authentiction token is expired!",
            button: "Ok",
            onClick: () => {
              navigator("/login");
            },
          });
          setTimeout(() => navigator("/login"), 5000);
        } else if (result.status === 404) {
          setModal({
            isShown: true,
            title: "The requested url not exists",
            body: "This url not found. the server responsed with status of 404",
            button: "Re try!",
            onClick: () => {
              window.location.reload();
            },
          });
        } else if (result.status === 500) {
          setModal({
            isShown: true,
            title: "an unexpected error occured",
            body: "The server responsed with status of 500",
            button: "Re try",
            onClick: () => {
              window.location.reload();
            },
          });
        } else {
          setModal({
            isShown: true,
            title: result.statusText,
            body: "The server responsed with status of " + result.status,
            button: "Retry!",
            onClick: () => {
              window.location.reload();
            },
          });
        }
      } catch (err) {
        setModal({
          isShown: true,
          title: "error while requesting",
          body: "The request cannot be sent from client to server",
          button: "Retry",
          onClick: () => {},
        });
      }
    });
  }, []);
  /* EmployeeManage */
  const handleEmp_create = () => {
    console.log("Create Emp clicked");
    setModal({
      isShown: true,
      title: "Test #1 + " + user.username,
      body: "only for test from handleEmp_create",
      button: "Ok",
      onClick: (e) => {
        console.log("is clicked: ", e);
      },
    });
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
  console.log(employees);
  if (isPending) return <p>Pending</p>;
  return <>{Toolboxes.map(ToolBox)}</>;
}
export default DafaultDashboard;
