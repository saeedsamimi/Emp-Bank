import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...res }) {
  const isAuthenticated = true;
  return (
    <Route
      {...res}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
