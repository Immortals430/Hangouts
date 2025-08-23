import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
// import { googleLoginThunk } from "../../../redux/reducers/user_reducer";
import { memo, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "./GoogleLoginButton.scss";

function GoogleLoginButton() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const login = useGoogleLogin({
    // onError: () => setLoading(false),
    // onSuccess: async ({ access_token }) => {
    //   setLoading(true);
    //   await dispatch(googleLoginThunk(access_token));
    //   setLoading(false);
    // },
  });

  return (
    <button className="google-login-btn" onClick={login} disabled={loading}>
      {loading ? (
        <MoonLoader size={20} color="white" />
      ) : (
        <>
          <FaGoogle size={20} />
          <span>Login with Google</span>
        </>
      )}
    </button>
  );
}

export default memo(GoogleLoginButton);
