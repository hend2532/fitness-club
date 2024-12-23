import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children} ) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("user.role: ", user?.role); 

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;
