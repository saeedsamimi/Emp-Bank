import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <Link to="/dashboard">!Dashboard!</Link>
      <Link to="/login">Please Log in...</Link>
      <Link to="/signin">Please Sign in...</Link>
    </>
  );
}
