import FullPageLoader from "../../FullPageLoader";
import useAuthCheck from "../../hooks/useAuthCheck";
import AuthNavbar from "../../Components/Auth/AuthNavbar/AuthNavbar";

export default function Authpage() {
  const { loading } = useAuthCheck();

  if (loading) return <FullPageLoader />;
  
  return (
    <AuthNavbar />
    
  );
}
