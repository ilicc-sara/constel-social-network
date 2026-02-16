import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LogIn from "./LogIN";
import Home from "./Index";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
