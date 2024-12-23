import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TrainerReviews from "../components/TrainerReviews";

function ScheduleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); 
  const [schedule, setSchedule] = useState(null);
  const [count, setCount] = useState(0);
  const [currentUserBookings, setCurrentUserBookings] = useState([]); 
  useEffect(() => {
    const fetchScheduleAndUserBookings = async () => {
      try {

        const scheduleResponse = await axios.get(
          `http://localhost:3001/schedule/${id}`
        );
        setSchedule(scheduleResponse.data);
        setCount(scheduleResponse.data.spacesAvailable);


        if (user) {
          const userResponse = await axios.get(
            `http://localhost:3001/users?email=${user.email}`
          );
          if (userResponse.data.length > 0) {
            setCurrentUserBookings(userResponse.data[0].booking || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScheduleAndUserBookings();
  }, [id, user]);

  const handleBooking = async () => {
    if (!user) {
      alert("You need to log in to book a spot!");
      navigate("/login");
      return;
    }

    if (user.role === "admin") {
      alert("Admins cannot book courses.");
      return;
    }

    if (count > 0) {
      try {
        const isAlreadyBooked = currentUserBookings.some(
          (booking) => booking.scheduleId === schedule.id
        );

        if (isAlreadyBooked) {
          alert("You have already booked this course!");
          return;
        }

  
        setCount((prev) => prev - 1);

        const updatedBookings = [
          ...currentUserBookings,
          {
            scheduleId: schedule.id,
            courseName: schedule.courseName,
            coachName: schedule.coachName,
          },
        ];

        const userResponse = await axios.get(
          `http://localhost:3001/users?email=${user.email}`
        );

        if (userResponse.data.length === 0) {
          throw new Error("User not found");
        }

        const userId = userResponse.data[0].id;

        const updatedUserData = {
          ...userResponse.data[0],
          booking: updatedBookings,
        };

        await axios.patch(
          `http://localhost:3001/users/${userId}`,
          updatedUserData
        );

        await axios.patch(`http://localhost:3001/schedule/${schedule.id}`, {
          spacesAvailable: count - 1,
        });

        alert("Booking confirmed!");
        navigate("/profile");
      } catch (error) {
        console.error("Error making booking:", error);
      }
    } else {
      alert("No spots left!");
    }
  };

  if (!schedule) return <div>Loading...</div>;

  return (
    <div key={schedule.id}>
      <div className="schedule">
        <div className="scheduleD schedule1">
          <h1>{schedule.courseName}</h1>
          <h4>{schedule.description}</h4>
          <p>{schedule.deadline}</p>
          <p>{schedule.duration}</p>
          <h4>{schedule.coachName}</h4>
          <h4>{schedule.coachDescription}</h4>
          <h3>{count} spots left – book yours now</h3>
          {user?.role !== "admin" && ( 
            
            <button onClick={handleBooking}>Confirm the booking</button>
          )}
        </div>
        <img src={`/public/${schedule.image}`} alt={schedule.courseName} />
      </div>
      <TrainerReviews />
    </div>
  );
}

export default ScheduleDetails;
