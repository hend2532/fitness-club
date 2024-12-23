import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children} ) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;
