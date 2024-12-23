import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/action";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { name, email, password };

    try {
      const userResponse = await axios.get(
        `http://localhost:3001/users?email=${user.email}`
      );

      if (userResponse.data.length === 0) {
        throw new Error("User not found");
      }

      const userId = userResponse.data[0].id;
      const response = await axios.patch(
        `http://localhost:3001/users/${userId}`,
        updatedData
      );

      dispatch(updateProfile(response.data));

      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="add-schedule">
      <h1>Edit Profile</h1>
      <form  onSubmit={handleSubmit}>
        <div className="form-group">

        <div >
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            />
        </div>
            </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
