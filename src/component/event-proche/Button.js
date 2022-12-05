import React, { useState } from "react";
import "./button.css";
import { Container, Row, Col } from "react-bootstrap/";
import Titre from "../titre/Titre";
const Button = (props) => {
  const [Value, setValue] = useState(0);

  const renderButton = () =>
    props.Start_date &&
    props.Start_date.map((value) => (
      <Col key={value._id} value={`${value._id}`} xs={12} lg={4}>
        <h6 onClick={() => handleClick(value._id)}>{value.name}</h6>
      </Col>
    ));

  const handleClick = (e) => {
    setValue(e);

    props.handlefiltres(e);
  };
  return (
    <div>
      <Titre Value={Value} titre="LES ÉVÈNEMENTS LE PLUS PROCHE" />
      <Container className="ContCss">
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Row className="RowCss"> {renderButton()} </Row>
        </div>
      </Container>
    </div>
  );
};

export default Button;
