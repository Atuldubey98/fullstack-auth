import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { exp } = localStorage.getItem("token")
    ? jwtDecode(JSON.parse(localStorage.getItem("token")))
    : { exp: 0 };
  if (Date.now() >= exp * 1000) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default PrivateRoute;
