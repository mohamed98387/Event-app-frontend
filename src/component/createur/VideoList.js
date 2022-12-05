import React from "react";
import { Card, Col, Row } from "antd";

import moment from "moment";
import { Link } from "react-router-dom";
import { Typography } from "antd";
const { Meta } = Card;
const { Title } = Typography;
const VideoList = (props) => {
  const Rendervideo = props.Videos.filter((el) => el.Validation === true).map(
    (Videos, index) => {
      var minutes = Math.floor(Videos.durée / 60);
      var seconds = Math.floor(Videos.durée - minutes * 60);
      return (
        <Col
          style={{
            marginBottom: 20,
          }}
          key={index}
          lg={6}
          md={8}
          xs={24}
        >
          <Link to={`/gallerie/DetailVideoPage/${Videos._id}`}>
            <div
              style={{
                position: "relative",
                marginRight: "1.5rem",
                cursor: "pointer",
              }}
            >
              <img
                style={{ width: "100%" }}
                alt="thumbnail"
                src={`http://localhost:5000/${Videos.thumbnail}`}
              />
              <div
                className=" duration"
                style={{
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  margin: "4px",
                  color: "#fff",
                  backgroundColor: "rgba(17, 17, 17, 0.8)",
                  opacity: 0.8,
                  padding: "2px 4px",
                  borderRadius: "2px",
                  letterSpacing: "0.5px",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "12px",
                }}
              >
                <span>
                  {minutes} : {seconds}
                </span>
              </div>
            </div>
          </Link>
          <Meta style={{ marginTop: 3 }} title={Videos.Titre} />
          <div
            style={{
              marginTop: 3,
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <span>{moment(Videos.createdAt).format("YYYY-MM-DD ")}</span>
          </div>
        </Col>
      );
    }
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: -70,
      }}
    >
      <div
        style={{
          width: "87%",
          marginLeft: 20,
        }}
      >
        <Title level={2}>Liste des vidéos</Title>
        <Row style={{ marginTop: "3rem auto" }}>{Rendervideo}</Row>
      </div>
    </div>
  );
};
export default VideoList;
