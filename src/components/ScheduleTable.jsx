import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function ScheduleTable() {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/users?email=${user.email}`
          );

          if (response.data.length > 0) {
            setBookings(response.data[0].booking || []); 
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        }
      };

      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-table">
      <h2>Your Booked Schedules</h2>
      {bookings.length === 0 ? (
        <p className="noData">No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Coach Name</th>
              <th>Schedule ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.courseName}</td>
                <td>{booking.coachName}</td>
                <td>{booking.scheduleId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ScheduleTable;
