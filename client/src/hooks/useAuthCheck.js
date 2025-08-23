import Cookie from "js-cookie";
import { useEffect, useState } from "react";
const projectName = import.meta.env.VITE_APP_PROJECT_NAME || "Hangouts";


const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const cookie = Cookie.get(projectName);
    if(cookie){
        setLoading(false)
    }
  }, []);

  return { loading };
};

export default useAuthCheck;
