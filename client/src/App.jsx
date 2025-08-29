import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import FullPageLoader from "./FullPageLoader";
import useAuthCheck from "./hooks/useAuthCheck";
import AsideMenu from "./Components/AsideMenu/AsideMenu/AsideMenu";

function App() {
  const { loading } = useAuthCheck();
  const [mobileAside, setMobileAside] = useState(false);

  if (loading) return <FullPageLoader />;

  return (
    <>
      <Navbar mobileAside={mobileAside} setMobileAside={setMobileAside} />
      <AsideMenu />
      <div className="container">
      <Outlet />
      </div>
    </>
  );
}

export default App;
