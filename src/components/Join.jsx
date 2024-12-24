const Join = () => {
  return (
    <div className="Join" id="join-us">
      <div className="left-j">
        <hr />
        <div>
          <span className="strok-text">Ready TO</span>
          <span className="join-text"> Level Up</span>
        </div>
        <div>
          <span className="join-text"> Your Body</span>
          <span className="strok-text"> With Us?</span>
        </div>
      </div>
      <div className="right-j">
        <form action="" className="email-container">
          <input
            type="email"
            name="user_email"
            placeholder="Enter your Email Addres Here"
          />
          <button className="btn-j"> Join Now</button>
        </form>
      </div>
    </div>
  );
};
export default Join;
