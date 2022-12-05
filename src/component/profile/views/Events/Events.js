import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "antd";
import Tooltip from "@material-ui/core/Tooltip";
import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const Events = () => {
  const [Events, setEvents] = useState([]);
  const getEvents = () => {
    axios.get("/api/event/all").then((res) => {
      if (res.data) {
        setEvents(
          res.data.filter((el) => el.User.email !== "chaieb.jasser@esprit.tn")
        );
      } else {
        alert("failed to grt Events");
      }
    });
  };
  const deleteEvent = (id) => {
    axios.delete(`/api/event/admin/${id._id}`).then((res) => {
      if (res.data) {
        let varaible = {
          text: "l'administrateur a supprimer votre événement",
          Titre: id.Titre,
          userId: id.User._id,
        };
        axios
          .post("/api/notification/saveNotification", varaible)
          .then((res) => {
            getEvents();
          });
      } else {
        alert("failed to get Events");
      }
    });
  };
  const notification = (infos) => {
    let a = infos.Validation;

    let varaible = {
      text: a
        ? "l'administrateur élimine votre événement"
        : "l'administrateur valide votre demande de événement",
      Titre: infos.Titre,
      userId: infos.User._id,
    };
    axios.post("/api/notification/saveNotification", varaible).then((res) => {
      getEvents();
    });
  };
  const handleChange = (event) => {
    let validation = {
      Validation: !event.Validation,
    };
    axios.put(`/api/event/validation/${event._id}`, validation).then((res) => {
      notification(event);
    });
  };
  useEffect(() => {
    getEvents();
  }, []);
  const renderTab = Events.map((el, i) => {
    return (
      <tr key={i}>
        <Tooltip
          title={
            <img
              style={{
                width: 280,
                height: 220,
                fontWeight: 500,
              }}
              src={`http://localhost:5000/${el.EventImage[0]}`}
              alt="event"
            />
          }
        >
          <td style={{ textAlign: "center" }}> {el.Titre}</td>
        </Tooltip>
        <td style={{ textAlign: "center" }}>
          {`${el.User.firstName} ${el.User.lastName}`} <br />
          {el.User.email}
          <br />
        </td>
        <td style={{ textAlign: "center" }}>
          {new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }).format(el.Start_date)}
          <br />
          {new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }).format(el.End_date)}
        </td>
        <td style={{ textAlign: "center" }}>
          {moment(el.createdAt).format("DD-MM-YYYY")}
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
          <Button onClick={() => deleteEvent(el)}>Supprimer</Button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Titre</th>
            <th>Créateure</th>
            <th>Date</th>
            <th>Date de creation</th>
            <th>validation</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
};

export default Events;
