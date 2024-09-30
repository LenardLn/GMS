import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import SupportPage from "./pages/SupportPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/calculator", element: <CalculatorPage /> },
      { path: "/info", element: <SupportPage /> },
    ],
  },
]);

export default router;
