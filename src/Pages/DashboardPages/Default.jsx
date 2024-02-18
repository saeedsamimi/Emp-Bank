import { Form, Table } from "react-bootstrap";
import ToolBox from "../../Components/ToolBox";
import { useEffect, useState, useTransition } from "react";

const url = import.meta.env.VITE_API_URL + "/getemployee";
const addEmpUrl = import.meta.env.VITE_API_URL + "/addemployee";
const editEmpUrl = import.meta.env.VITE_API_URL + "/editemployee";
const deleteEmpUrl = import.meta.env.VITE_API_URL + "/delemployee";

// eslint-disable-next-line no-unused-vars
function DafaultDashboard({ user, setModal, navigator, setToast }) {
  const [employees, setEmployees] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(null);

  const employeeView = (value, i) => {
    return (
      <tr key={i} onClick={() => setSelected(i)}>
        <td className={selected === i ? "text-bg-secondary" : ""}>{i + 1}</td>
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
        e.target.innerText = "inserting...";
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
            setToast({
              show: true,
              title: "Employee inserted",
              mode: "success",
              body: "The employee inserted successfully!",
            });
          } else {
            setToast({
              show: true,
              title: "Employee cannot insert",
              mode: "danger",
              body: "The employee cannot insert , please try again",
            });
          }
        } catch (err) {
          setToast({
            show: true,
            title: "Error while inserting!",
            mode: "warning",
            body: "The employee cannot insert: \n" + (err.message || err.code),
          });
        } finally {
          setModal({
            isShown: false,
          });
        }
      },
    });
  };

  const handleEmp_edit = () => {
    if (selected === null) {
      setToast({
        show: true,
        title: "No item is selected!",
        mode: "warning",
        body: "No item selected please select an employee to edit!",
      });
    } else {
      const selectedEmp = employees.at(selected);
      console.log(selectedEmp);
      setModal({
        isShown: true,
        title: "Edit Employee",
        body: (
          <Form id="editEmpForm">
            <Form.Group>
              <Form.Label htmlFor="firstname">First Name: </Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                id="firstname"
                defaultValue={selectedEmp.firstname}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="lastname">Last Name: </Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                id="lastname"
                defaultValue={selectedEmp.lastname}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="job">Job: </Form.Label>
              <Form.Control
                type="text"
                name="job"
                id="job"
                required
                defaultValue={selectedEmp.job}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="salary">Salary: </Form.Label>
              <Form.Control
                type="number"
                maxLength="9"
                minLength="4"
                name="salary"
                defaultValue={selectedEmp.salary}
                id="salary"
                required
              />
            </Form.Group>
          </Form>
        ),
        button: "Edit",
        onClick: async (e) => {
          const formData = new FormData(document.getElementById("editEmpForm"));
          formData.append("id", selectedEmp._id);
          e.target.innerText = "editing...";
          e.target.setAttribute("Disabled", "");
          try {
            const result = await fetch(editEmpUrl, {
              method: "POST",
              mode: "cors",
              body: formData,
              headers: {
                Authorization: "Bearer " + document.cookie.split("=")[1],
              },
            });
            if (result.ok) {
              setToast({
                show: true,
                title: "Employee updated",
                mode: "success",
                body: "The employee updated successfully!",
              });
            } else {
              setToast({
                show: true,
                title: "Employee cannot update",
                mode: "danger",
                body: "The employee cannot updated , please try again",
              });
            }
          } catch (err) {
            setToast({
              show: true,
              title: "Error while updating!",
              mode: "warning",
              body:
                "The employee cannot update: \n" + (err.message || err.code),
            });
          } finally {
            setModal({
              isShown: false,
            });
          }
        },
      });
    }
  };

  const handleEmp_delete = () => {
    if (selected === null) {
      setToast({
        show: true,
        title: "No item is selected!",
        mode: "warning",
        body: "No item selected please select an employee to Delete!",
      });
    } else {
      setModal({
        isShown: true,
        title: "sure to delete?",
        body: "Are you sure to delete this item?",
        button: "Delete",
        onClick: async (e) => {
          e.target.innerText = "editing...";
          e.target.setAttribute("Disabled", "");
          const empID = employees.at(selected)._id;
          try {
            const result = await fetch(deleteEmpUrl, {
              method: "DELETE",
              body: empID,
              headers: {
                Authorization: "Bearer " + document.cookie.split("=")[1],
              },
            });
            if (result.ok) {
              setToast({
                show: true,
                title: "Error while deleting!",
                mode: "success",
                body: "The employee deleted successfully: \n",
              });
            } else {
              setToast({
                show: true,
                title: "Error while updating!",
                mode: "warning",
                body: "The employee cannot delete. maybe your authentication failed.",
              });
            }
          } catch (err) {
            setToast({
              show: true,
              title: "failed to fetch delete !",
              mode: "danger",
              body:
                "the connection to backend for deleting this item failed. " +
                  err.message || err.code,
            });
          } finally {
            setModal({
              isShown: false,
            });
          }
        },
      });
    }
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
          text: "Delete Employee",
          icon: "trash",
          onClick: handleEmp_delete,
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
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
  };

  if (isPending) return <p>Loading...</p>;
  return (
    <>
      {Toolboxes.map(ToolBox)}
      {employees.length > 0 && (
        <Table striped bordered hover style={tableStyle}>
          <thead>
            <tr>
              <td>#</td>
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
