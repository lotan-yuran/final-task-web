import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "./Recoil";

export const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(userState);
  let location = useLocation();

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
