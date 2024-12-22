import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ScheduleDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  let [count,setCount]=useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/schedule");
        setDetails(response.data);
        const selectCount=response.data.find(
            (schedule)=> schedule.id===(id)
        )
        if(selectCount){
            setCount(selectCount.spacesAvailable)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="schedule">
      {details &&
        details.map((schedule) => {
            if (schedule.id ===(id)) {
            return (
              <div  key={schedule.id} >
                <div  className="schedule">
                  <div className="scheduleD schedule1">
                    <h1>{schedule.courseName}</h1>
                    <h4>{schedule.description}</h4>
                    <p>{schedule.deadline}</p>
                    <p>{schedule.duration}</p>
                    <h4>{schedule.coachName}</h4>
                    <h4>{schedule.coachDescription}</h4>
                    <h3>
                      {count} spots left – book yours now
                    </h3>
                    <button onClick={()=>setCount(prev=> prev>0 ? prev-1 : prev)}>Confirm the booking</button>
                  </div>
                  <img
                    src={`/public/${schedule.image}`}
                    alt={schedule.courseName}
                  />
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
export default ScheduleDetails;


