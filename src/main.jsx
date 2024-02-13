import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "./Error";
import SignIn from "./Pages/Signin";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Setting";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route path="" element={<App />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={<PrivateRouter Component={Dashboard} />}
      />
      <Route path="profile" element={<PrivateRouter Component={Profile} />} />
      <Route path="setting" element={<PrivateRouter Component={Settings} />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
