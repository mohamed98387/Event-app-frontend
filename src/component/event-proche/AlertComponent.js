import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
const AlertComponent = (props) => {
  return (
    <div id="evenemetnsproche" className="BoxCon">
      <Alert className="box">
        <Link to={`/evenemet/${props.data.id}`}>
          <Container>
            <Row>
              <Col xs={12} lg={2}>
                <time>
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(props.data.Start_date)}
                  <br />
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(props.data.End_date)}
                </time>
              </Col>
              <Col className="description">
                <img
                  src={`http://localhost:5000/${props.data.userImage}`}
                  alt="1"
                />
                <div>
                  <h4>{props.data.Titre}</h4>
                  <p>{props.data.Description}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Link>
      </Alert>
    </div>
  );
};

export default AlertComponent;
