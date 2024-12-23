
import { useState } from "react";
import "../css/Slider.css";
const trainers = [
  {
    name: "Ali",
    image: "/public/assets/man1.jpg",
    review: "Ali is a fantastic coach who always motivates you to do your best!"
  },
  {
    name: "Mohamed",
    image: "/public/assets/man2.jpg",
    review: "Mohamed has a great approach to training, and her sessions are always fun!"
  },
  {
    name: "jane",
    image: "/public/assets/man3.jpg",
    review: "jane is very professional and supportive, making everyone feel comfortable during sessions."
  }
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trainers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trainers.length) % trainers.length);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="trainer-card">
          <p>{trainers[currentIndex].review}</p>
          <h3>{trainers[currentIndex].name}</h3>
          <div className="slider-dir">
          <button className="prev" onClick={handlePrev}>{"<"}</button>
          <button className="next" onClick={handleNext}>{">"}</button>
          </div>
        </div>
          <img src={trainers[currentIndex].image} alt={trainers[currentIndex].name} />
      </div>

    </div>
  );
}

export default Slider;
