import { useState, useEffect, useTransition, useCallback } from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ Component }) {
  const [isAuthenticated, setAuthentication] = useState(null);
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
        if (result.ok) {
          setAuthentication(true);
          console.log("Authenticated!");
          return result.text();
        } else {
          setAuthentication(false);
        }
      })
      .then((res) => {
        setUsername(res);
      })
      .catch(() => {
        setAuthentication(false);
      });
  }, []);
  if (isAuthenticated === null) {
    return <a>Loading...</a>;
  } else {
    return isAuthenticated ? (
      <Component index={0} username={username} />
    ) : (
      <Navigate to="/login" />
    );
  }
}
export default PrivateRouter;
