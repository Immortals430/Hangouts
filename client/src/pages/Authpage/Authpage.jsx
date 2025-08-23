import { useState } from "react";
import FullPageLoader from "../../FullPageLoader";
import useAuthCheck from "../../hooks/useAuthCheck";
import AuthNavbar from "../../Components/Auth/AuthNavbar/AuthNavbar";
import SignupForm from "../../Components/Auth/SignupForm/SignupForm";
import SigninForm from "../../Components/Auth/LoginForm/LoginForm";
import "./Authpage.scss";
import ForgortPassword from "../../Components/Auth/ForgotPassword/ForgotPassword";

export default function Authpage() {
  const [authComponent, setAuthComponent] = useState("login");

  const { loading } = useAuthCheck();

  const authComponents = {
    login: <SigninForm setAuthComponent={setAuthComponent} />,
    signup: <SignupForm setAuthComponent={setAuthComponent} />,
    reset: <ForgortPassword setAuthComponent={setAuthComponent} />,
  };

  if (loading) return <FullPageLoader />;

  return (
    <>
      <AuthNavbar setAuthComponent={setAuthComponent} />

      <div className="auth-container">
        <div className="banner">
          <img src="/img/banner.webp" alt="banner" />
        </div>
        <div className="auth-forms">{authComponents[authComponent]}</div>
      </div>
    </>
  );
}
