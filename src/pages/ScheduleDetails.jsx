import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TrainerReviews from "../components/TrainerReviews"
function ScheduleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [schedule, setSchedule] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/schedule/${id}`
        );
        setSchedule(response.data);
        setCount(response.data.spacesAvailable);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  }, [id]);

  const handleBooking = async () => {
    if (count > 0 && user) {
      try {
        setCount((prev) => prev - 1);

        const updatedBookings = [
          ...(user.booking || []),
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
      alert("No spots left or user not logged in!");
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
          <button onClick={() => handleBooking(schedule)}>
            Confirm the booking
          </button>
        </div>
        <img src={`/public/${schedule.image}`} alt={schedule.courseName} />
      </div>
      <TrainerReviews/>
    </div>
  );
}

export default ScheduleDetails;
