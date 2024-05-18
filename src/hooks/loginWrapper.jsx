import { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";

const LoginRouteWrapper = ({ component }) => {
  const { loggedIn } = useAuthContext();

  return loggedIn ? <Navigate to='/overview' /> : <>{component}</>;
};

export default LoginRouteWrapper;
