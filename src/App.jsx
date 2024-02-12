import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const URL = "https://saeedsamimi-nodejs.liara.run";

export default function App() {
  return (
    <>
      <Link to="/dashboard">!Dashboard!</Link>
      <Link to="/login">Please Log in...</Link>
      <Link to="/signin">Please Sign in...</Link>
    </>
  );
}
