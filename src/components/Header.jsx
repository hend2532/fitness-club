import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/action";
import "../css/header.css"
function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <img src="/logo.png" alt="logo" />
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/trainers">Trainers</Link>
        {isAuthenticated && user.role === "admin" && (
          <Link to="/adminDashboard">Admin</Link>
        )}
        <Link to="/contact">Contact</Link>
        {isAuthenticated ? (
          <button className="logoutButton" onClick={handleLogout}>Logout</button>
        ) : (
          <Link className="loginButton" to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
