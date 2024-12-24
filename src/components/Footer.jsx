


const Footer = () => {
  
  const footerContainerStyle = {
    position: "relative",
    textAlign: "center",
  };

  const hrStyle = {
    border: "1px solid  white", 
  };

  const footerStyle = {
    padding: "2rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "4rem",
    alignItems: "center",
    justifyContent: "center",
    height: "20rem",
  };

  const socialLinksStyle = {
    display: "flex",
    gap: "4rem",
  };

  const socialIconStyle = {
    width: "3rem",
    height: "3rem",
    cursor: "pointer",
  };

  const logoStyle = {
    width: "10rem",
  };

  return (
    <div style={footerContainerStyle}>
      <hr style={hrStyle} />

      <div style={footerStyle}>
        <div style={socialLinksStyle}>
          <img src="/public/assets/insta.png" alt="Instagram" style={socialIconStyle} />
          <img src="/assets/face.png" alt="Facebook" style={socialIconStyle} />
          <img src="/assets/whats.png" alt="Whatsapp" style={socialIconStyle} />
        </div>
        <div>
          <img src="logo.png" alt="Logo" style={logoStyle} />
        </div>
      </div>
    </div>
  );
};

export default Footer;