import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Card, Col, Row } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const { Meta } = Card;
function VideoList() {
  const [Loading, setLoading] = useState(false);
  const [Videos, setVideos] = useState([]);
  const getVideos = () => {
    axios.get("/api/video").then((response) => {
      if (response.data) {
        setVideos(response.data);
        setLoading(true);
      } else {
        alert("Failed to get Videos");
      }
    });
  };
  useEffect(() => {
    getVideos();
  }, []);
  const handleDelete = (id) => {
    axios.delete(`/api/video/${id}`);
    getVideos();
  };
  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.durée / 60);
    var seconds = Math.floor(video.durée - minutes * 60);

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
        <Link to={`/gallerie/DetailVideoPage/${video._id}`}>
          <div
            style={{
              position: "relative",
              marginRight: "2rem",
              cursor: "pointer",
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
        <Meta style={{ marginTop: 3 }} title={video.Titre} />
        <div
          style={{
            marginTop: 3,
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <span>{moment(video.createdAt).format("YYYY-MM-DD")}</span>

          <DeleteForeverIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(video._id)}
          />
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
            marginLeft: "3rem auto",
            marginRight: "3rem auto",
            marginBottom: "3rem auto",
          }}
        >
          <hr />

          <Row style={{ marginTop: "3rem auto" }}>{renderCards}</Row>
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
}

export default VideoList;
