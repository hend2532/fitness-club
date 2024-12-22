import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/addSchedule.css"; 

function AddSchedule() {
  const [schedule, setSchedule] = useState({
    courseName: "",
    description: "",
    deadline: "",
    duration: "",
    coachName: "",
    coachDescription: "",
    spacesAvailable: 0,
    image: "", 
  });

  const navigate = useNavigate();

  useEffect(() => {
    const images = [
      "image1.jpg",
      "image2.jpg",
      "image3.jpg",
      "image4.jpg",
      "image5.jpg",
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      image: `/images/${images[randomIndex]}`, 
    }));
  }, []);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/schedule", schedule);
      navigate("/schedule"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-schedule">
      <h1>Add New Schedule</h1>
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

{/*       
        <div className="random-image">
          <label>Selected Image:</label>
          {schedule.image && <img src={schedule.image} alt="Random" />}
        </div> */}

        <button type="submit">Add Schedule</button>
      </form>
    </div>
  );
}

export default AddSchedule;
