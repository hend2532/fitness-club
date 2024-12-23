import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/profile.css";
import ScheduleTable from "../components/ScheduleTable";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null); 

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/users?email=${user.email}`
          );
          if (response.data.length > 0) {
            setProfileData(response.data[0]); 
          } else {
            console.log("User not found in JSON Server");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchData();
    }
  }, [user]);

   if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

   if (!profileData) {
    return <div>Loading your profile...</div>;
  }

  return (
    <>
      <div className="profile">
        <h1>Welcome, {profileData.name}!</h1>
        <div className="profile-info">
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Membership:</strong> {profileData.membershipType || "Basic"}</p>
          <p><strong>Role :</strong> {profileData.role}</p>
        </div>

        <div className="profile-actions">
          <Link to="/EditProfile">Edit Profile</Link>
        </div>
      </div>
      <ScheduleTable />
    </>
  );
}

export default Profile;
