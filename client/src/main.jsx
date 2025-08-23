import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Authpage from "./pages/Authpage/Authpage.jsx";
import "./scss/index.scss"
import NotFoundpage from "./pages/NotFoundpage/NotFoundpage.jsx";

const routes = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      { index: true, element: <Homepage /> }
    ],
  },
  { path: "/auth", element: <Authpage /> },
  { path: "*", element: <NotFoundpage /> },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={routes} />
  // </StrictMode>,
);
