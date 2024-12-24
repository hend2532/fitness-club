import "../css/Home.css"; 
import Slider from "../components/Slider";
import Join from "../components/Join";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <div className="hero">
        <div className="left-h">
          <div className="the-best-ad">
            <div>THE BEST</div>
            <span>FITNESS CLUB IN THE TOWN</span>
          </div>

          <div className="hero-text">
            <div>
              <span className="strok-text">Shape </span>
              <span className="inter-text"> Your</span>
            </div>
            <div>
              <span className="inter-text"> Ideal body</span>
            </div>
            <div>
              <span>
                In here we will help you to shape and build your ideal body and
                live up your life to fullest
              </span>
            </div>
          </div>
          <div className="figures">
            <div>
              <span>+ 140</span>
              <span> expert coaches</span>
            </div>
            <div>
              <span>+ 978</span>
              <span>MEMBER JOINED</span>
            </div>
            <div>
              <span>+ 50</span>
              <span>FITNESS PROGRAMS</span>
            </div>
          </div>
          <div className="hero-buttons">
            <button className="btn"> Get Started</button>
            <button className="btn"> Learn More</button>
          </div>
        </div>

        <div className="right-h">
          <button className="btn"> Join Now</button>

          <div className="heart-rate">
            <img
              src="/assets/heart.png"
              alt=""
              className="heart"
            />
            <span>Heart Rate</span>
            <span> 116 bpm</span>
          </div>
          <img
            src="/assets/person.png"
            alt=""
            className="Man"
          />
          <div className="calories">
            <img
              src="/assets/calories.png"
              alt=""
              className="calory"
            />
            <div>
              <span> Calories Burned</span>
              <span>220 Kal</span>
            </div>
          </div>
        </div>
      </div>
      <div className="programs" id="programs">

        <div className="programs-header">
          <span className="strok-text">Explore Our </span>
          <span className="between">Programs</span>
          <span className="strok-text">To Shape You</span>
        </div>

  
        <div className="row-divs-container">
      
          <div className="row-div" id="div1">
            <div className="row-div-header">
              <h2 className="row-div-title">Good trainers</h2>
              <img
                src="/assets/courses.png"
                className="row-div-icon"
                alt="trainer"
              />
            </div>
            <p className="row-div-description">
              Having good schedules and trainers can really make a difference in a fitness club. It keeps you motivated and ensures you're getting the best guidance. What kind of workouts are you interested in?
            </p>
            <p className="row-div-explore">
              Explore more <span className="row-div-arrow">→</span>
            </p>
          </div>

   
          <div className="row-div">
            <div className="row-div-header">
              <h2 className="row-div-title">Good Schedules</h2>
              <img
                src= "/assets/courses.png"
                className="row-div-icon"
                alt="diet"
              />
            </div>
            <p className="row-div-description">
              Well-planned schedules provide structure and consistency, helping individuals stay committed and reach their fitness goals more efficiently. What kind of workouts are you interested in?
            </p>
            <p className="row-div-explore">
              Explore more <span className="row-div-arrow">→</span>
            </p>
          </div>
        </div>
        <Slider />
        <Join/>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
