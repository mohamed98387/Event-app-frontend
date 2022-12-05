import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import Bkt from "../Back-to-top/BackTop";
import Footer from "../footer/Footer";
import NavBar from "../nav-app/NavApp";
import axios from "axios";
import moment from "moment";
import SideVideoBar from "./SideVideoBar";
import ReactLoading from "react-loading";
import AbonneComponent from "./AbonneComponent";
import CommentVideo from "./CommentsVideo";
import LikeDislikes from "./LikesDsilikes";
import { connect } from "react-redux";
function DetailVideoPage(props) {
  const videoId = props.match.params.id;
  const [Video, setVideo] = useState([]);
  const [Adherent, setAdherent] = useState({});
  const [Loading, setLoading] = useState(false);
  const [CommentList, setCommnets] = useState([]);
  const videoVariable = {
    videoId: videoId,
  };
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
    myArray = CommentList.map((e) => {
      for (let element of arr) {
        if (e.userId._id === element.user) Object.assign(e, element);
      }
      return e;
    });
  };
  megreArray();
  const getAdhernts = (id) => {
    axios.get(`/api/adherent/${id}`).then((response) => {
      if (response.data) {
        setAdherent(response.data);
        setLoading(true);
      } else alert("failed to fetch data");
    });
  };
  const getComments = (id) => {
    const variables = {
      videoId: id,
    };
    axios.post("/api/commentVideo/getComments", variables).then((response) => {
      if (response.data.success) {
        setCommnets(response.data.comments);
      } else {
        alert("Failed to save Comment");
      }
    });
  };
  const updateComment = (newComment) => {
    setCommnets(CommentList.concat(newComment));
  };

  useEffect(() => {
    getComments(videoId);
  }, []);
  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.video);
        getAdhernts(response.data.video.createure._id);
      } else {
        alert("Failed to get video Info");
      }
    });
  }, []);
  useEffect(() => {
    getAdherents();
  }, []);
  useEffect(() => {
    megreArray();
  });
  return (
    <div>
      {Loading ? (
        <div>
          <NavBar navDetailVideo={props.location.pathname} />
          <Row style={{ marginTop: 120, marginBottom: 100 }}>
            <Col xs={24} lg={16}>
              <div
                className="postPage"
                style={{ width: "90%", padding: "0 4rem" }}
              >
                <video
                  style={{ width: "100%" }}
                  src={`http://localhost:5000/${Video.filePath}`}
                  controls
                ></video>
                <List.Item
                  actions={[
                    <AbonneComponent
                      Adherent={Adherent.User}
                      videoId={videoId}
                    />,
                    <LikeDislikes
                      myArray={myArray}
                      videoId={videoId}
                      userId={props.auth}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`http://localhost:5000/${Adherent.userImage}`}
                      />
                    }
                    title={Video.Titre}
                    description={Video.description}
                  />
                </List.Item>
                <span>{moment(Video.createdAt).format("YYYY-MM-DD")}</span>
                <span> </span>
              </div>
              <CommentVideo
                style={{ marginTop: 50 }}
                refrechFunction={updateComment}
                CommentList={CommentList}
                videoId={videoId}
              />
            </Col>
            <Col xs={24} lg={8}>
              <SideVideoBar />
            </Col>
          </Row>
          <Bkt />
          <Footer style={{ margintop: 300 }} />
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
const mapStateToProps = (state) => {
  return {
    auth: state.auth.user.id,
  };
};
export default connect(mapStateToProps)(DetailVideoPage);
