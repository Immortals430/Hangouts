import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Authpage from "./pages/Authpage/Authpage.jsx";
import NotFoundpage from "./pages/NotFoundpage/NotFoundpage.jsx";
import { Provider } from "react-redux";
import "./scss/index.scss";
import { store } from "./redux/store.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Homepage /> }],
  },
  { path: "/auth", element: <Authpage /> },
  { path: "*", element: <NotFoundpage /> },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
  // </StrictMode>,
);
