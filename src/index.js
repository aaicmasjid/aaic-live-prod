import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,

  Outlet,
} from "react-router-dom";
import About from "./components/Pages/About.jsx";
import Home from "./components/Pages/Home.jsx";
import Contact from "./components/Pages/Contact.jsx";
import Navbar from "./components/NavBar.js";
import ErrorPage from "./routes/ErrorPage.js";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);