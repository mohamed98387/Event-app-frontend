import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageScrool from "./Carousel";
import { Row, Col } from "antd";
import Navapp from "../nav-app/NavApp";
import Footer from "../footer/Footer";
import ReactLoading from "react-loading";
import Bkt from "../Back-to-top/BackTop";

import VideoList from "./VideoList";
import ListCompnent from "./ListComponent";
import Infos from "./Infos";

const UserProfile = (props) => {
  const [MyEvents, setMyEvents] = useState([]);
  const [Adherent, setAdherent] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Videos, setVideos] = useState([]);
  const getVideos = () => {
    const variable = {
      createure: props.match.params.id,
    };
    axios.post("/api/video/allUserVideo", variable).then((response) => {
      if (response.data) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  };

  const getAdhernts = () => {
    axios.get(`/api/adherent/${props.match.params.id}`).then((response) => {
      if (response.data) {
        setAdherent(response.data);
      } else alert("failed to fetch data");
    });
  };
  const getEvents = () => {
    axios.get(`/api/event/id/${props.match.params.id}`).then((response) => {
      if (response.data) {
        setMyEvents(response.data);
        setLoading(true);
      } else alert("failed to fetch data");
    });
  };

  let arr = MyEvents.map(function (item) {
    return { EventImage: item.EventImage };
  });

  let array = arr.map((el) => {
    return [...el.EventImage];
  });
  var finalArray = array.flat();

  useEffect(() => {
    getAdhernts();
    getEvents();
    getVideos();
  }, []);
  return (
    <div>
      {Loading ? (
        <div>
          <Navapp navPr={props.location.pathname} />
          <div
            className="profilepage"
            style={{ width: "100%", padding: "3rem 4rem" }}
          >
            <br />
            <Row style={{ marginTop: 120, marginBottom: 90 }} gutter={[16, 16]}>
              <Col lg={12} xs={24}>
                <ImageScrool array={finalArray} />
              </Col>
              <Col lg={12} xs={24}>
                <Infos idCreature={props.match.params.id} Adherent={Adherent} />
              </Col>
              <Col xs={24}>
                <ListCompnent MyEvents={MyEvents} />
              </Col>
            </Row>
            <VideoList Videos={Videos} />
          </div>
          <Bkt />
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

export default UserProfile;
