import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserThunk,
  userSelector,
} from "../redux/reducers/user_reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const projectName = import.meta.env.VITE_APP_PROJECT_NAME || "Hangouts";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector(userSelector);

  // fetch authorization from cookie
  useEffect(() => {
    const checkAuthorization = async () => {
      const cookie = Cookie.get(projectName);
      if (cookie) {
        await dispatch(getCurrentUserThunk(cookie));
      }
      setLoading(false);
    };
    checkAuthorization();
  }, []);

  // user is authorized or authenticated navigate to the location
  useEffect(() => {
    if (currentUser.id && pathname !== "/auth") {
      console.log(currentUser);

      navigate(pathname);
    } else navigate("/auth");
  }, [currentUser.id]);

  return { loading };
};

export default useAuthCheck;
