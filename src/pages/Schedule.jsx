import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Schedule() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/schedule");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="schedule">
      {data.map((schedule) => {
        return <div key={schedule.id} className="schedule1">
            <h1>{schedule.courseName}</h1>
            <p>{schedule.deadline}</p>
            <p>{schedule.duration}</p>
            <h4>{schedule.coachName}</h4>
            <h3>Only {schedule.spacesAvailable} places left!</h3>
            <Link to={`/schedule/${schedule.id}`}>Join Now</Link>
        </div>;
      })}
    </div>
  );
}

export default Schedule;
