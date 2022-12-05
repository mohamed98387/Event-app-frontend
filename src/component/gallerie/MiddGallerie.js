import React, { useEffect, useState } from "react";
// import Navbar from "../Nvbar/Navbar";
import NavApp from "../nav-app/NavApp";

import "./MiddGallerie.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { Card, Avatar, Col, Row } from "antd";
import axios from "axios";

import moment from "moment";

import BackToTop from "../Back-to-top/BackTop";
import ReactLoading from "react-loading";
import "./MiddGallerie.css";

const { Meta } = Card;
const MiddGallerie = (props) => {
  const [Videos, setVideos] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [alladht, setAlladh] = useState([]);

  const getAdherents = () => {
    axios.get("/api/adherent/all").then((response) => {
      if (response.data) {
        setAlladh(response.data);
      } else alert("failed to fetch data");
    });
  };

  let arr = alladht.map(function (item) {
    return { user: item.User, userImage: item.userImage };
  });

  let myArray = [];
  const megreArray = () => {
    myArray = Videos.map((e) => {
      for (let element of arr) {
        if (e.createure._id === element.user) Object.assign(e, element);
      }
      return e;
    });
  };

  const getVideos = () => {
    axios.get("/api/video/allVideo").then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);

        setLoading(true);
      } else alert("failed to fetch data");
    });
  };
  useEffect(() => {
    getVideos();
    getAdherents();
  }, []);
  megreArray();
  const renderCards = myArray
    .filter((el) => el.Validation === true)
    .map((video, index) => {
      var minutes = Math.floor(video.durée / 60);
      var seconds = Math.floor(video.durée - minutes * 60);

      return (
        <Col key={index} lg={6} md={8} xs={24}>
          <Link to={`/gallerie/DetailVideoPage/${video._id}`}>
            <div
              style={{
                textDecoration: "none",
                position: "relative",
                width: "90%",
                marginTop: 20,
              }}
            >
              <img
                style={{ width: "100%" }}
                alt="thumbnail"
                src={`http://localhost:5000/${video.thumbnail}`}
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
          <Meta
            style={{ marginTop: 5, textDecoration: "none" }}
            avatar={<Avatar src={`http://localhost:5000/${video.userImage}`} />}
            title={video.Titre}
          />
          <span style={{ marginTop: -3, textDecoration: "none" }}>
            {video.createure.userName}
          </span>
          <br />
          <div
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <span> {moment(video.createdAt).format("YYYY-MM-DD")} </span>
          </div>
        </Col>
      );
    });

  return (
    <div>
      {Loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <NavApp navBg={props.location.pathname} />
          <div style={{ marginTop: 100 }} className="section-MyHeader">
            <h2>Gallery</h2>
          </div>
          <hr />
          <div
            style={{
              width: "85%",
              margin: "3rem auto",
            }}
          >
            <Row>{renderCards}</Row>
          </div>
          <BackToTop />
          <Footer />
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="balls" height={120} width={120} color="#f82249" />
        </div>
      )}
    </div>
  );
};

export default MiddGallerie;
