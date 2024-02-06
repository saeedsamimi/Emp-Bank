import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [username, setUsername] = useState("NULL");

  useEffect(() => {
    fetch("http://localhost:8080/login", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    })
      .then((result) => result.text())
      .then((res) => setUsername(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <a>username: {username}</a>
      <Link to="/dashboard">!Dashboard!</Link>
      <Link to="/login">Please Log in...</Link>
      <Link to="/signin">Please Sign in...</Link>
    </>
  );
}
