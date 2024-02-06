import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/Auth", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    })
      .then((result) => {
        if (result.ok) return result.text();
        else setUsername("");
      })
      .then((res) => setUsername(res))
      .catch(() => setUsername(""));
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
