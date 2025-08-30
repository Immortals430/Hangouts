import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Authpage from "./pages/Authpage/Authpage.jsx";
import NotFoundpage from "./pages/NotFoundpage/NotFoundpage.jsx";
import Storepage from "./pages/StorePage/StorePage.jsx"
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import Friendpage from "./pages/Friendpage/Friendpage.jsx";
import "./scss/index.scss";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/people-you-may-know", element: <Friendpage /> },
      { path: "/store", element: <Storepage /> }
    ],
  },
  { path: "/auth", element: <Authpage /> },
  { path: "*", element: <NotFoundpage /> },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <ToastContainer />
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </>
  // </StrictMode>,
);
