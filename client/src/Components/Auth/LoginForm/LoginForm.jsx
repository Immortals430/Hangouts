import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../redux/reducers/user_reducer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import MoonLoader from "react-spinners/MoonLoader";
import "./LoginForm.scss";

export default function SigninForm({ setAuthComponent }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // signin
  async function callLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    await dispatch(loginThunk({ email, password }));
    setLoading(false);
  }

  return (
    <form className="login-form" onSubmit={callLogin}>
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="true"
        required
      />
      <input type="password" name="password" placeholder="Password" required />
      <p className="link" onClick={() => setAuthComponent("reset")}>
        Forgotten password?
      </p>
      
      <button className="login-btn" disabled={loading}>
        {loading ? <MoonLoader size={20} color="white" /> : "Login"}
      </button>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
        <GoogleLoginButton />
      </GoogleOAuthProvider>

      <p className="signup-para">Dont have an account?</p>

      <button
        type="button"
        className="signup-btn"
        onClick={() => setAuthComponent("signup")}
      >
        Create Account
      </button>
    </form>
  );
}
