import React, { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Typography } from "antd";
import { Button } from "antd";

const { Title } = Typography;
function RservationPage(props) {
  const [events, setEvents] = useState([]);
  const [myResevedEvents, setMyResevedEvents] = useState([]);
  const [MyEvnets, setMyEvnets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [alladhrents, setAlladherents] = useState([]);

  let variable = { userId: props.userId.user.id };
  useEffect(() => {
    setAllUsers(props.allUsers);
    setAlladherents(props.allAdherents);
  }, [props.allUsers, props.allAdherents]);
  useEffect(() => {
    fetchRes();
  }, []);
  let reserved;
  const megreArray = () => {
    reserved = events.map((e) => {
      for (let element of allUsers) {
        if (e.User === element._id) Object.assign(e, element);
      }
      return e;
    });
  };
  let myArray;
  const megreEvents = () => {
    myArray = MyEvnets.map((e) => {
      for (let element of myResevedEvents) {
        if (e.User === element.idCreateure) Object.assign(e, element);
      }
      return e;
    });
    myArray = myArray.map((e) => {
      for (let element of allUsers) {
        if (e.userId === element._id) Object.assign(e, element);
      }
      return e;
    });
    myArray = myArray.map((e) => {
      for (let element of alladhrents) {
        if (e.userId === element.User) Object.assign(e, element);
      }
      return e;
    });
  };
  const fetchRes = () => {
    axios.post("/api/event/getMyReservedEvent").then((response) => {
      if (response.data) {
        setMyEvnets(response.data);
      } else {
        alert("Failed to add  events");
      }
    });
  };

  useEffect(() => {
    axios.post("/api/event/getReservedEvent", variable).then((response) => {
      if (response.data.success) {
        setEvents(response.data.events);
      } else {
        alert("Failed to add  events");
      }
    });
  }, [variable]);
  useEffect(() => {
    axios.get("/api/reservation").then((response) => {
      if (response.data) {
        setMyResevedEvents(response.data);
      } else {
        alert("Failed to add  events");
      }
    });
  }, []);

  megreArray();
  megreEvents();

  const renderTab = reserved.map((el, i) => {
    const content = (
      <div>
        {el.EventImage ? (
          <img
            style={{ width: 300 }}
            src={`http://localhost:5000/${el.EventImage[0]}`}
            alt="event"
          />
        ) : (
          " no image"
        )}
      </div>
    );
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}>
          Username: {el.userName}
          <br />
          Email: {el.email}
        </td>
        <Tooltip
          content={content}
          title={
            <div>
              <h5
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  color: "###",
                  fontFamily: "italic",
                }}
              >
                {el.Titre}
              </h5>
              <img
                style={{
                  width: 280,
                  height: 200,
                  marginTop: -7,
                  fontWeight: 500,
                }}
                src={`http://localhost:5000/${el.EventImage[0]}`}
                alt="event"
              />
            </div>
          }
        >
          <td style={{ textAlign: "center" }}>{el.Titre}</td>
        </Tooltip>
        <td style={{ textAlign: "center" }}>
          {el.City} <br /> {el.Country}
        </td>
        <td style={{ textAlign: "center" }}>
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }).format(el.Start_date)}
        </td>
        <td style={{ textAlign: "center" }}>
          <Button style={{ textAlign: "center" }}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/evenemet/${el.id}`}
            >
              Retirer de la liste
            </Link>
          </Button>
        </td>
      </tr>
    );
  });
  const renderTab2 = myArray.map((el, i) => {
    return (
      <tr key={i}>
        <Tooltip
          title={
            <div>
              <h5
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  color: "###",
                  fontFamily: "italic",
                }}
              >
                {el.userName}
              </h5>
              {el.userImage && (
                <img
                  style={{
                    width: 280,
                    height: 200,
                    marginTop: -7,
                    fontWeight: 500,
                  }}
                  src={`http://localhost:5000/${el.userImage}`}
                  alt="event"
                />
              )}
            </div>
          }
        >
          <td style={{ textAlign: "center" }}>
            Nom :{el.firstName} {el.lastName}
            <br />
            Email: {el.email} <br />
            Tel: {el.Phone}
          </td>
        </Tooltip>

        <td style={{ textAlign: "center" }}>
          {el.City} <br /> {el.Country}
        </td>
        <Tooltip
          title={
            <div>
              <h5
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  color: "###",
                  fontFamily: "italic",
                }}
              >
                {el.Titre}
              </h5>
              {el.EventImage && (
                <img
                  style={{
                    width: 280,
                    height: 200,
                    marginTop: -7,
                    fontWeight: 500,
                  }}
                  src={`http://localhost:5000/${el.EventImage[0]}`}
                  alt="event"
                />
              )}
            </div>
          }
        >
          <td style={{ textAlign: "center" }}>{el.Titre}</td>
        </Tooltip>
        <td style={{ textAlign: "center" }}>
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }).format(el.Start_date)}
        </td>
        <td style={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              let variable = {
                userId: el.userId,
                eventId: el.eventId,
              };
              axios
                .post("/api/reservation/unReserve", variable)
                .then((response) => {
                  if (response.data) {
                    fetchRes();
                  } else {
                    alert("failed to unreserve");
                  }
                });
            }}
            style={{ textAlign: "center" }}
          >
            Retirer de la liste
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title>Mes réservations</Title>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Créature</th>
            <th>Titre</th>
            <th>Adresse</th>
            <th>Date</th>
            <th>Annuler la réservation</th>
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
      {props.userId.registred === true && (
        <div style={{ marginTop: 50 }}>
          <Title>Mes événements réservé</Title>
          <table>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Participant</th>
                <th>Adresse de Participant</th>
                <th>Titre</th>
                <th>Date</th>
                <th>Supprimer l'abonné</th>
              </tr>
            </thead>
            <tbody>{renderTab2}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth,
    allUsers: state.EventReducer.allUsers,
    allAdherents: state.EventReducer.allAdherents,
  };
};
export default connect(mapStateToProps)(RservationPage);
