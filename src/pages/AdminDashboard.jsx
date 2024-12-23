
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

function AdminDashboard() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user.role !== "admin") {
    return <Navigate to="/home" />;
  }
  return (
    // <div>
      <div className="admin">
        <Link to="/adminDashboard/users">Users</Link>
        <Link to="/adminDashboard/schedule">Schedule</Link>
        {/* <Link to="/adminDashboard/trainers">Trainers</Link> */}
      </div>

    // </div>
  )
}

export default AdminDashboard
