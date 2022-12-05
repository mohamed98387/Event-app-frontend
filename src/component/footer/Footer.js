import React from "react";
import "./Footer.css";
import logo0 from "../../images/logo2.png";
import logo from "../../images/social/fb.png";
import logo1 from "../../images/social/g+.png";
import logo2 from "../../images/social/in.png";
import logo3 from "../../images/social/twit.png";
const Footer = (props) => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div style={{ width: "100%" }} className="container">
          <div style={{ width: "100%" }} className="row">
            <div className="col-lg-3 col-md-6 footer-info">
              <img src={logo0} alt="TheEvenet" />
            </div>
            <div className="col-lg-3 col-md-6 footer-info">
              <h4>QUI SOMME-NOUS</h4>
            </div>
            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Contacter Nous</h4>
            </div>
            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Suivez nous</h4>
              <div className="social-links">
                <a href="#s">
                  <img src={logo} alt="fb" />
                </a>
                <a href="#s">
                  <img
                    src={logo1}
                    style={{
                      width: 35,
                    }}
                    alt="g+"
                  />
                </a>
                <a href="#s">
                  <img src={logo2} alt="fb" />
                </a>
                <a href="#s">
                  <img src={logo3} alt="fb" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
