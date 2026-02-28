import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LogIn from "./pages/LogIn";
import Home from "./pages/Index";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
