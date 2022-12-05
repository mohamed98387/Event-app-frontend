import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
function AbonneComponent(props) {
  const [AbonnéNumber, setAbonnéNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  const onSubscribe = () => {
    const AbonnéNumberVariables = {
      videoId: props.videoId,
      userId: props.auth,
    };

    if (Subscribed) {
      axios
        .post("/api/abonne/deSabonne", AbonnéNumberVariables)
        .then((response) => {
          if (response.data.success) {
            setAbonnéNumber(AbonnéNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to desabonné");
          }
        });
    } else {
      axios
        .post("/api/abonne/sAbonne", AbonnéNumberVariables)
        .then((response) => {
          if (response.data.success) {
            setAbonnéNumber(AbonnéNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to abonné");
          }
        });
    }
  };

  useEffect(() => {
    const AbonnéNumberVariables = {
      videoId: props.videoId,
      userId: props.auth,
    };
    axios
      .post("/api/abonne/abonneNumber", AbonnéNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setAbonnéNumber(response.data.abonneNumber);
        }
      });

    axios
      .post("/api/abonne/abonned", AbonnéNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.abonne);
        }
      });
  }, []);

  return (
    <div>
      {props.isAuthenticated === true ? (
        <React.Fragment>
          {props.auth.toString() === props.Adherent._id.toString() ? (
            <button
              style={{
                backgroundColor: `${Subscribed ? "#AAAAA" : "#CC0000"}`,
                borderRadius: "4px",
                color: "white",
                padding: "10px 16px",
                fontWeight: "500",
                fontSize: "1rem",
                textTransform: "uppercase",
              }}
            >
              {AbonnéNumber} {Subscribed ? "Désabonner" : "S'abonner"}
            </button>
          ) : (
            <button
              onClick={onSubscribe}
              style={{
                backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
                borderRadius: "4px",
                color: "white",
                padding: "10px 16px",
                fontWeight: "500",
                fontSize: "1rem",
                textTransform: "uppercase",
              }}
            >
              {AbonnéNumber} {Subscribed ? "Désabonner" : "S'abonner"}
            </button>
          )}{" "}
        </React.Fragment>
      ) : (
        <button
          style={{
            backgroundColor: `${Subscribed ? "#AAAAA" : "#CC0000"}`,
            borderRadius: "4px",
            color: "white",
            padding: "10px 16px",
            fontWeight: "500",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          {AbonnéNumber} {Subscribed ? "Désabonner" : "S'abonner"}
        </button>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth.user.id,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(AbonneComponent);
