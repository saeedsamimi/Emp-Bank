import { useState, useEffect, useTransition, useCallback } from "react";
import { Navigate } from "react-router-dom";
const URL = "https://saeedsamimi-nodejs.liara.run";
const isDebug = true;

function PrivateRouter({ Component }) {
  const [isAuthenticated, setAuthentication] = useState(true);
  const [username, setUsername] = useState("");
  if (!isDebug) {
    useEffect(() => {
      fetch(URL + "/Auth", {
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
  }
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
