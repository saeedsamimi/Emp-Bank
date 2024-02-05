import { Link, useLocation, useRouteError } from "react-router-dom";
import logo from "./Icons/JPEG/main-logo.jpeg";

function GetErrorHeader(status, location) {
  switch (status) {
    case 404:
      return (
        <>
          <h1>Page not found!</h1>
          <p>the Page "...{location}" not exists!</p>
        </>
      );
    case 400:
      return (
        <>
          <h1>Error occured with status code 400!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
        </>
      );
    default:
      <>
        <h1>An unexpacted error occured!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </>;
  }
}

export default function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  return (
    <>
      <img src={logo} width={150} className="pb-4" />
      {GetErrorHeader(error.status, location.pathname)}
      <p className="mt-2 px-5 py-1 rounded-bottom-3 text-danger border-danger border border-1">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/login">Go to Login page</Link>
    </>
  );
}
