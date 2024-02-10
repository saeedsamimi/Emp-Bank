import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Error";
import SignIn from "./Pages/Signin";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Profile from "./Pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRouter Component={Dashboard} />,
  },
  {
    path: "/profile",
    element: <PrivateRouter Component={Profile} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
