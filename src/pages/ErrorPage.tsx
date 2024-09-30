import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <div style={{ margin: "2rem" }}>
        <h1 style={{ fontSize: "3rem" }}>Oops...</h1>
        <p>
          {" "}
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occured"}{" "}
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
