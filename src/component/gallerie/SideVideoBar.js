import React, { useEffect, useState } from "react";

import axios from "axios";
const SideBarVideo = () => {
  const [Videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get("/api/video/allVideo").then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else alert("failed to fetch data");
    });
  }, []);
  const sideVideoItem = Videos.filter((el) => el.Validation === true).map(
    (el, i) => {
      var minutes = Math.floor(el.durée / 60);
      var seconds = Math.floor(el.durée - minutes * 60);
      return (
        <div
          key={i}
          style={{ width: "100%", display: "flex", padding: "0 2rem" }}
        >
          <div style={{ width: "40%", margin: "1rem" }}>
            <a href={`/gallerie/DetailVideoPage/${el._id}`}>
              <img
                style={{ width: "100%" }}
                src={`http://localhost:5000/${el.thumbnail}`}
                alt="dazdza"
              />
            </a>
          </div>
          <div style={{ width: "50%", paddingTop: 30 }}>
            <a
              style={{ textDecoration: "none", color: "#808080" }}
              href={`/gallerie/DetailVideoPage/${el._id}`}
            >
              <span style={{ fontSize: "1rem", color: "black" }}>
                {el.Titre}
              </span>
              <br />
              <span> {el.createure.userName}</span>
              <br />
              <span> {el.categorie}</span>
              <br />
              <span>
                {minutes}:{seconds}
              </span>
            </a>
          </div>
        </div>
      );
    }
  );
  return <div style={{ marginTop: -17 }}>{sideVideoItem}</div>;
};

export default SideBarVideo;
