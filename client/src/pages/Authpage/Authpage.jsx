import { useState } from "react";
import FullPageLoader from "../../FullPageLoader";
import useAuthCheck from "../../hooks/useAuthCheck";
import AuthNavbar from "../../Components/Auth/AuthNavbar/AuthNavbar";

import SigninForm from "../../Components/Auth/LoginForm/LoginForm";
import "./Authpage.scss"

export default function Authpage() {
  const [authComponent, setAuthComponent] = useState("login");

  const { loading } = useAuthCheck();

  const authComponents = {
    login: <SigninForm setAuthComponent={setAuthComponent} />,

  };

  if (loading) return <FullPageLoader />;

  return (
    <>
      <AuthNavbar setAuthComponent={setAuthComponent} />

      <div className="auth-container">
        <div className="banner">
          <img src="/img/banner.webp" alt="banner" />
        </div>
        <div className="auth-forms">
          {authComponents[authComponent]}
        </div>
      </div>
    </>
  );
}
