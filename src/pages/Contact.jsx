
import { useRef } from "react";
import "../App.css"
import emailjs from '@emailjs/browser';
function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_7k6auvj', 'template_0whtqja', form.current, {
        publicKey: '-yKTkS74RpehR1JOI',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Email sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div className="contact">
      <div className="contact1">
        <div>
            <h1>
                <img src="./assets/call.png" alt="call"/>
                CALL US
            </h1>
            <p>1(234)567-891,1(234)567-891</p>
        </div>
        <div>
            <h1>
                <img src="./assets/maps-and-flags.png" alt="call"/>
                LOCATION
            </h1>
            <p>121 Rock Street ,21Avenue ,New York</p>
        </div>
        <div>
            <h1>
                <img src="./assets/clock.png" alt="call"/>
                BUSINESS HOURS
            </h1>
            <p>Mon-Fri.....10am</p>
        </div>
      </div>
      <div className="contact2">
        <h1>contact us </h1>
        <form ref={form} onSubmit={sendEmail}>
            <input name="name" type="text" placeholder="enter your Name..." />
            <input name="email" type="email" placeholder="enter a valid email address" />
            <textarea name="message"  placeholder="Message"></textarea>
            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
