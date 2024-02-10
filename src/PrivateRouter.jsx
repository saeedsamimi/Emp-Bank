import { useState, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ Component, ...props }) {
  const [{ isAuthenticated, user }, setAuthorization] = useState({
    isAuthenticated: null,
    user: null,
  });
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
          return result.json();
        } else {
          setAuthorization({ isAuthenticated: false });
        }
      })
      .then((res) => {
        setAuthorization({ isAuthenticated: true, user: res });
      })
      .catch(() => {
        setAuthorization({ isAuthenticated: false });
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
