import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import axios from "axios";
function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { name: "", email: "", password: "", confirmPass: "" };

    if (!form.name) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPass) {
      newErrors.confirmPass = "Confirm password is required";
    } else if (form.password !== form.confirmPass) {
      newErrors.confirmPass = "Passwords do not match";
    }
    setError(newErrors);

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPass
    ) {
      return;
    }
    try {
      const response = await axios.get("http://localhost:3001/users");
      const emailTaken = response.data.some(
        (user) => user.email === form.email
      );

      if (emailTaken) {
        setError({ ...error, email: "This email is already taken" });
        return;
      }
      await axios.post("http://localhost:3001/users", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user",
      });

      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="login">
      <div className="login1">
        <img src="/public/logo.png" alt="call" />

        <h1>Sign Up </h1>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="name"
          />
          {error.name && <p className="error">{error.name}</p>}
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="email"
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

          <div className="password">
            <input
              name="confirmPass"
              value={form.confirmPass}
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <i
              className={showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          {error.confirmPass && <p className="error">{error.confirmPass}</p>}
          <button type="submit">Sign up</button>
          <p className="account">
            Already have an account?
            <span>
              <Link to="/login">Sign in</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
