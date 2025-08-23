import { IoShareSocial } from "react-icons/io5";
import "./AuthNavbar.scss";

export default function AuthNavbar({setAuthComponent}) {
  return (
    <nav className="auth-nav">
      <a href="/" className="nav-left-container">
        <h1 >
          <IoShareSocial color="#12d877" />
          <span>Hangouts</span>
        </h1>
      </a>

      <div className="nav-right-container">
        <button className="login-btn" onClick={() => setAuthComponent("login")}>
          Login
        </button>
        <button className="signup-btn" onClick={() => setAuthComponent("signup")}>
          Signup
        </button>
      </div>
    </nav>
  );
}
