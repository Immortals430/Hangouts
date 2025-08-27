import { useEffect, useState } from "react";
import { signupAPI } from "../../../api/api";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";
import "./SignupForm.scss";

export default function SignupForm({ setAuthComponent }) {
  const [passwordState, setPasswordState] = useState("");
  const [confirmPassState, setConfirmPassState] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // set if password is valid or not
  useEffect(() => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;
    if (passwordState === confirmPassState) {
      setIsValidPassword(regex.test(passwordState));
      setPasswordMatch(true);
    } else setPasswordMatch(false);
  }, [passwordState, confirmPassState]);

  // signup
  async function callSignup(e) {
    e.preventDefault();
    setLoading(true);
    if (!passwordMatch && !isValidPassword) return;
    const formData = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    try {
      const { data } = await signupAPI(formData);
      toast.success(data.message);
      e.target.reset();
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="signup-form" onSubmit={callSignup}>
      <h1>Signup</h1>

      <input type="text" name="username" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={(e) => setPasswordState(e.target.value)}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
        onChange={(e) => setConfirmPassState(e.target.value)}
      />
      {!passwordMatch && <p className="error">*Passwords do not match!</p>}
      {!isValidPassword && (
        <p className="error">
          *Password must be at least 8 characters long and include at least one
          uppercase letter, one lowercase letter, one number, and one special
          character.
        </p>
      )}
      <p>
        Aready have an account?{" "}
        <span className="link" onClick={() => setAuthComponent("login")}>
          Login
        </span>
      </p>

      <button type="submit" className="signup-btn" disabled={loading}>
        {loading ? <MoonLoader size={20} color="white" /> : "Signup"}
      </button>
    </form>
  );
}
