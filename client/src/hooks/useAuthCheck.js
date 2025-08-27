import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserThunk,
  userSelector,
} from "../redux/reducers/user_reducer";
import { useLocation, useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector(userSelector);
  // fetch authorization from cookie
  useEffect(() => {
    const checkAuthorization = async () => {
      await dispatch(getCurrentUserThunk());
      setLoading(false);
    };
    checkAuthorization();
  }, []);

  // user is authorized or authenticated navigate to the location
  useEffect(() => {
    if (currentUser.id && pathname !== "/auth") {
      navigate(pathname);
    } else if (currentUser.id && pathname == "/auth") {
      navigate("/");
    } else navigate("/auth");
  }, [currentUser.id]);

  return { loading };
};

export default useAuthCheck;
