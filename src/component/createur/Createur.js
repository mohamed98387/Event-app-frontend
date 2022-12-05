import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Createur.css";
import axios from "axios";
import Image from "./CreateurImage";
import Titre from "../titre/Titre";

const Createur = () => {
  const [postSize, setPostSize] = useState(0);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimt] = useState(6);
  const [Adherents, setAdherents] = useState([]);

  const getAdherents = (variables) => {
    axios.post("/api/adherent/getFilterAdh", variables).then((response) => {
      if (response.data.success) {
        setAdherents(response.data.adherant);

        setPostSize(response.data.postSize);
      } else alert("failed to fetch data");
    });
  };
  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getAdherents(variables);
  }, []);

  return (
    <div>
      <Titre titre="Nos créateurs les plus actifs" />
      <Container>
        <Row style={{ width: "100%" }}>
          {Adherents.map((el, i) => (
            <Col key={i} className="MyCol" xs={12} md={6} lg={4}>
              <Image
                setSkip={setSkip}
                setLimt={setLimt}
                postSize={postSize}
                data={el}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Createur;
