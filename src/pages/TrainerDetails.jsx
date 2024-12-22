import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TrainerDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/trainers");
        setDetails(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="trainer trainerDD">
      {details &&
        details.map((trainer) => {
          if ((trainer.id) === (id)) {
            return (
              <div key={trainer.id}>
                <div className="trainer">
                  <img
                    src={`/public/assets/${trainer.img}`}
                    alt={trainer.courseName}
                  />
                  <div className="trainerD trainer1">
                    <h1>
                      {trainer.coachName}
                      <p style={{ display: "inline" }}>
                        {trainer.rate}
                        <img src="/public/assets/star.png" alt="rate" />
                      </p>
                    </h1>
                    <p>{trainer.track}</p>
                    <h4>{trainer.certification}</h4>
                  </div>
                  <div className="services">
                      <div className="service1">
                        <div >
                          <h3>Services Offered</h3>
                          {
                            trainer.servicesOffered.map((service) => (
                              <p key={service}>{service}</p>
                            ))
                          }
                        </div>
                        <div>
                          <h3>Client Reviews</h3>
                          <p>{trainer.clientReview}</p>
                        </div>

                      </div>
                      <h4>
                        {trainer.details}
                      </h4>
                      <button>Book a Section Now</button>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
export default TrainerDetails;
