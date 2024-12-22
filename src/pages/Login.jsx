import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { login } from "../redux/action";
import { useDispatch } from "react-redux";
function Login() {
  
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { email: "", password: "" };

    if (!form.email || !form.password) {
      if (!form.email) newErrors.email = "Email is required";
      if (!form.password) newErrors.password = "Password is required";
      setError(newErrors);
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      setError(newErrors);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: { email: form.email },
      });

      if (response.data.length === 0) {
        newErrors.email = "User not found";
        setError(newErrors);
        return;
      }

      const user = response.data[0];
      if (user.password !== form.password) {
        newErrors.password = "Incorrect password";
        setError(newErrors);
        return;
      }

      setError(newErrors);
 
      const userData={role:user.role,email:user.email}
      dispatch(login(userData));
      console.log('User data:', userData);
      if(user.role == "admin"){
        navigate("/adminDashboard");
      }else if(user.role == "user"){
        navigate("/home");
      }
    } catch (error) {
      newErrors.email = "An error occurred. Please try again later.";
      setError(newErrors);
      console.error(error);
    }

  };
  return (
    <div className="login">
      <div className="login1">
        <img src="/public/logo.png" alt="call" />

        <h1>LOG IN </h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
          {error.email && <p className="error">{error.email}</p>}

          <div className="password">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <i
              className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {error.password && <p className="error">{error.password}</p>}

          <p className="forget">Forgot Password?</p>
          <button type="submit" className="login-button">
            LOG IN
          </button>

          <p className="account">
            Don't have an account?
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
