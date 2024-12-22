import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Trainers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/trainers");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="trainer">
      {data.map((trainer) => {
        return <div key={trainer.id} className="trainer1">
            <img src={`/public/assets/trainer.jfif`} alt={trainer.coachName}/>
            <h1>{trainer.coachName}
            <p style={{display:"inline"}}>{trainer.rate} 
                <img src="/public/assets/star.png" alt="rate"/>
            </p>
            </h1>
            <p>{trainer.track}</p>
             <Link to={`/trainers/${trainer.id}`}>View Profile</Link>
        </div>;
      })}
    </div>
  );
}

export default Trainers;
