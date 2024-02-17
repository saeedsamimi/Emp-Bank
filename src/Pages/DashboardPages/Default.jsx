import { Form, Table } from "react-bootstrap";
import ToolBox from "../../Components/ToolBox";
import { useEffect, useState, useTransition } from "react";

const url = import.meta.env.VITE_API_URL + "/getemployee";
const addEmpUrl = import.meta.env.VITE_API_URL + "/addemployee";

// eslint-disable-next-line no-unused-vars
function DafaultDashboard({ user, setModal, navigator }) {
  const [employees, setEmployees] = useState([]);
  const [isPending, startTransition] = useTransition();

  const employeeView = (value, i) => {
    return (
      <tr key={i}>
        <td>{value.firstname + " " + value.lastname}</td>
        <td>{value.job}</td>
        <td>{value.salary}</td>
      </tr>
    );
  };

  useEffect(function () {
    startTransition(async function () {
      try {
        const result = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie.split("=")[1],
          },
          mode: "cors",
        });
        if (result.ok) {
          const emps = await result.json();
          console.log(emps);
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
    setModal({
      isShown: true,
      title: "Create Employee",
      body: (
        <Form id="createEmpForm">
          <Form.Group>
            <Form.Label htmlFor="firstname">First Name: </Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              id="firstname"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="lastname">Last Name: </Form.Label>
            <Form.Control type="text" name="lastname" id="lastname" required />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="job">Job: </Form.Label>
            <Form.Control type="text" name="job" id="job" required />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="salary">Salary: </Form.Label>
            <Form.Control
              type="number"
              maxLength="9"
              minLength="4"
              name="salary"
              id="salary"
              required
            />
          </Form.Group>
        </Form>
      ),
      button: "Create",
      onClick: async (e) => {
        const formData = new FormData(document.getElementById("createEmpForm"));
        e.target.innerText = "Loading...";
        e.target.setAttribute("Disabled", "");
        try {
          const result = await fetch(addEmpUrl, {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: {
              Authorization: "Bearer " + document.cookie.split("=")[1],
            },
          });
          if (result.ok) {
            alert("Yes inserted!");
            setModal({
              isShown: false,
            });
          } else {
            alert("Cannot insert!");
            setModal({
              isShown: false,
            });
          }
        } catch (err) {
          console.log(err);
          setModal({
            isShown: false,
          });
        }
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
  const tableStyle = {
    gridColumn: "1/-1",
    boxShadow: "0 0 7px rgba(0, 0, 0, 0.2)",
  };
  if (isPending) return <p>Loading...</p>;
  return (
    <>
      {Toolboxes.map(ToolBox)}
      {employees.length > 0 && (
        <Table striped bordered hover style={tableStyle}>
          <thead>
            <tr>
              <td>Employee Name</td>
              <td>Job</td>
              <td>Salary</td>
            </tr>
          </thead>
          <tbody>{employees.map(employeeView)}</tbody>
        </Table>
      )}
      {employees.length === 0 && (
        <h3 style={{ ...tableStyle, textAlign: "center", padding: "1rem 0" }}>
          No employee was found. you can create one!
        </h3>
      )}
    </>
  );
}
export default DafaultDashboard;
