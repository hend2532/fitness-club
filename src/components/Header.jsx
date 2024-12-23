import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/action";
import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className="header">
      <NavLink className="logo" to="/home">
        <img src="/logo.png" alt="logo" />
      </NavLink>
      <nav >
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
          to="/schedule"
        >
          Schedule
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
          to="/trainers"
        >
          Trainers
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
          to="/contact"
        >
          Contact
        </NavLink>
        {isAuthenticated && user.role === "user" && (
          <NavLink to="/profile" className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }>
            <FontAwesomeIcon icon={faUser} />
            
          </NavLink>
        )}
        {isAuthenticated && user.role === "admin" && (
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
            to="/adminDashboard"
          >
            Admin
          </NavLink>
        )}
      </nav>
        {isAuthenticated ? (
          <button className="logoutButton" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? "loginButton active-link" : "loginButton"
            }
            to="/login"
          >
            Login
          </NavLink>
        )}
    </div>
  );
}

export default Header;
