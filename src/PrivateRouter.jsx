import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ Component, ...props }) {
  const [isAuthenticated, setAuthentication] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/Auth", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    })
      .then((result) => {
        if (result.ok) {
          setAuthentication(true);
          return result.json();
        } else {
          setAuthentication(false);
        }
      })
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        setAuthentication(false);
      });
  }, []);
  if (isAuthenticated === null) {
    return <a>Loading...</a>;
  } else {
    return isAuthenticated ? (
      <Component {...props} user={user} />
    ) : (
      <Navigate to="/login" />
    );
  }
}
export default PrivateRouter;
