import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ routeTo, authCondition, children }) => {
  if (!authCondition) {
    return <Navigate to={routeTo} replace />;
  }
  return children ? children : <Outlet />;
};
