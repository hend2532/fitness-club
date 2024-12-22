import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/editSchedule.css"; 
function EditSchedule() {
  const { id } = useParams(); 
  const [schedule, setSchedule] = useState({
    courseName: "",
    description: "",
    deadline: "",
    duration: "",
    coachName: "",
    coachDescription: "",
    spacesAvailable: 0,
  });


  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/schedule/${id}`);
        setSchedule(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSchedule();
  }, [id]);

;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/schedule/${id}`, { ...schedule });
      navigate("/schedule"); 
   
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-schedule">
      <h1>Edit Schedule</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={schedule.courseName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={schedule.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={schedule.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={schedule.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Coach Name:</label>
          <input
            type="text"
            name="coachName"
            value={schedule.coachName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Coach Description:</label>
          <textarea
            name="coachDescription"
            value={schedule.coachDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Spaces Available:</label>
          <input
            type="number"
            name="spacesAvailable"
            value={schedule.spacesAvailable}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditSchedule;
