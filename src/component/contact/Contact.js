import React, { useState } from "react";
import NavApp from "../nav-app/NavApp";
import Fotter from "../footer/Footer";
import BackToTop from "../Back-to-top/BackTop";
import "./Contact.css";
import { addcontact } from "../../actions/contactaction";
import { connect } from "react-redux";

import { Row, Container, Col, Form } from "react-bootstrap";

const Contact = (props) => {
  console.log(props);
  const [Contact, setContact] = useState({
    name: "",
    email: "",
    sujet: "",
    message: "",
  });

  const handleChange = (e) => {
    setContact({ ...Contact, [e.target.name]: e.target.value });
  };
  const handleSubmilt = (e) => {
    e.preventDefault();
    if (
      Contact.email === "" ||
      Contact.name === "" ||
      Contact.sujet === "" ||
      Contact.message === ""
    ) {
      alert("svp remplir tous les champs");
    } else {
      props.addcontact(Contact);
      alert("votre message est bien reçu");
      setContact({
        name: "",
        email: "",
        sujet: "",
        message: "",
      });
    }
  };
  return (
    <div>
      <NavApp navContact={props.location.pathname} />
      <section id="contact" style={{ marginTop: "40px" }}>
        <Container style={{ marginTop: -20 }} className="container">
          <div className="section-header">
            <h2>CONTACTEZ NOUS</h2>
          </div>
          <div className=" contact-info">
            <Row>
              <Col md={4}>
                <div className="contact-address">
                  <i className="ion-ios-location-outline" />
                  <h3 id="adresse">ADRESSE</h3>
                  <address>.............</address>
                </div>
              </Col>
              <Col md={4} className="col-md-4">
                <div className="contact-phone">
                  <i className="ion-ios-telephone-outline" />
                  <h3>TÉLÉPHONE</h3>
                  <p>
                    <a href="tel:+21653045249">+216 53045249</a>
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="contact-email">
                  <i className="ion-ios-email-outline" />
                  <h3>E-MAIL</h3>
                  <p>
                    <a href="mailto:chaieb.jasser@esprit.tn">
                      chaieb.jasser@esprit.tn
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container fluid={true}>
          <Form className="contactForm ">
            <Row className="form-row " style={{ width: "100%" }}>
              <Col xs={12} sm={6} className="form-group ">
                <input
                  style={{ border: "1px solid #ced4da" }}
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Nom"
                  onChange={handleChange}
                  value={Contact.name}
                />
              </Col>
              <Col xs={12} sm={6} className="form-group ">
                <input
                  style={{ border: "1px solid #ced4da", width: "100%" }}
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=" E-mail"
                  data-rule="email"
                  onChange={handleChange}
                  value={Contact.email}
                />
              </Col>
            </Row>
            <div className="form-group">
              <input
                style={{ border: "1px solid #ced4da" }}
                type="text"
                className="form-control"
                name="sujet"
                id="subject"
                placeholder="Sujet"
                onChange={handleChange}
                value={Contact.sujet}
              />
            </div>
            <div className="form-group">
              <textarea
                style={{ border: "1px solid #ced4da" }}
                className="form-control"
                name="message"
                rows={5}
                id="message"
                placeholder="Message"
                onChange={handleChange}
                value={Contact.message}
              />

              <div className="text-center">
                <button
                  onClick={handleSubmilt}
                  style={{
                    background: "#f82249",
                    border: 0,
                    padding: "10px 40px",
                    color: "#fff",
                    transition: "0.4s",
                    borderRadius: "50px",
                    cursor: "pointer",
                    outline: "none",
                    height: "45px",
                    marginTop: 20,
                  }}
                >
                  <p id="button" style={{ fontSize: "15px" }}>
                    Envoyer Message
                  </p>
                </button>
              </div>
            </div>
          </Form>
        </Container>
      </section>
      <Fotter />
      <BackToTop />
    </div>
  );
};

export default connect(null, { addcontact })(Contact);
