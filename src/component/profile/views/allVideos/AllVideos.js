import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "antd";
import { Switch } from "antd";
import Tooltip from "@material-ui/core/Tooltip";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
const AllVideos = () => {
  const [Video, setVideo] = useState([]);
  const notification = (infos) => {
    let a = infos.Validation;
    let varaible = {
      text: a
        ? "l'administrateur élimine votre video"
        : "l'administrateur valide votre demande de video",
      Titre: infos.Titre,
      userId: infos.createure._id,
    };
    axios.post("/api/notification/saveNotification", varaible).then((res) => {
      getVideo();
    });
  };
  const getVideo = () => {
    axios.get("/api/video/allVideo").then((res) => {
      if (res.data) {
        setVideo(
          res.data.videos.filter(
            (el) => el.createure.email !== "chaieb.jasser@esprit.tn"
          )
        );
      } else {
        alert("failed to get Video");
      }
    });
  };
  const deleteVideo = (id) => {
    axios.delete(`/api/video/${id._id}`).then((res) => {
      if (res.data) {
        let varaible = {
          text: "l'administrateur a supprimer votre video",
          Titre: id.Titre,
          userId: id.createure._id,
        };
        axios
          .post("/api/notification/saveNotification", varaible)
          .then((res) => {
            getVideo();
          });
      }
    });
  };
  const handleChange = (video) => {
    let validation = {
      Validation: !video.Validation,
    };
    axios.put(`/api/video/validation/${video._id}`, validation).then((res) => {
      notification(video);
    });
    getVideo();
  };
  useEffect(() => {
    getVideo();
  }, []);
  const renderTab = Video.map((el, i) => {
    var minutes = Math.floor(el.durée / 60);
    var seconds = Math.floor(el.durée - minutes * 60);
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}>
          {`${el.createure.firstName} ${el.createure.lastName}`} <br />
          {el.createure.email}
        </td>
        <Tooltip
          title={
            <img
              style={{
                width: 280,
                height: 220,
                fontWeight: 500,
              }}
              src={`http://localhost:5000/${el.thumbnail}`}
              alt="video"
            />
          }
        >
          <td style={{ textAlign: "center" }}> {el.Titre} </td>
        </Tooltip>

        <td style={{ textAlign: "center" }}>
          {minutes}:{seconds}
        </td>
        <td style={{ textAlign: "center" }}>
          {moment(el.createdAt).format("DD-MM-YYYY")}{" "}
        </td>
        <td style={{ textAlign: "center" }}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={el.Validation}
            onChange={() => handleChange(el)}
          />
        </td>
        <td style={{ textAlign: "center" }}>
          <Button onClick={() => deleteVideo(el)}>Supprimer</Button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Créateure</th>
            <th>Titre</th>
            <th>Durée</th>
            <th>Date de creation</th>
            <th>Validation</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
};

export default AllVideos;
