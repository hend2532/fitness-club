import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
function Schedule() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/schedule");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // حذف الجدول
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/schedule/${id}`);
      // تحديث البيانات بعد الحذف
      setData((prevData) => prevData.filter((schedule) => schedule.id !== id));
      alert("Schedule deleted successfully!");
    } catch (error) {
      console.log("Error deleting schedule:", error);
      alert("Failed to delete schedule!");
    }
  };

  return (
    <>
      <Link to="/addSchedule" className="add">
       Add New Schedule
      </Link>
      <div className="schedule">
        {data.map((schedule) => (
          <div key={schedule.id} className="schedule1">
            <h1>{schedule.courseName}</h1>
            <p>{schedule.deadline}</p>
            <p>{schedule.duration}</p>
            <h4>{schedule.coachName}</h4>
            <h3>Only {schedule.spacesAvailable} places left!</h3>
            <div className="icon">
            <Link to={`/edit-schedule/${schedule.id}`} className="edit-link">
            <FontAwesomeIcon icon={faEdit} />
            </Link>
          
            <button onClick={() => handleDelete(schedule.id)} className="delete-btn">
            <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Schedule;
