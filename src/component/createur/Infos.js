import React, { useEffect, useState } from "react";
import { Avatar, Descriptions } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const Infos = (props) => {
  const classes = useStyles();
  const [Number, setNumber] = useState(0);
  const [Message, setMessage] = useState("");
  const [Followed, setFollowed] = useState(false);
  useEffect(() => {
    const variable = {
      idCreateure: props.idCreature,
      userId: props.userId,
    };
    axios.post("/api/follow/FollowresNumber", variable).then((res) => {
      if (res.data.success) {
        setNumber(res.data.followresNumber);
      }
    });
    axios.post("/api/follow/followed", variable).then((response) => {
      if (response.data.success) {
        setFollowed(response.data.followres);
      }
    });
  }, []);

  const handleFollow = () => {
    let variable = {
      userId: props.userId,
      idCreateure: props.idCreature,
    };
    if (Followed) {
      axios.post("/api/follow/unFollow", variable).then((response) => {
        if (response.data.success) {
          setNumber(Number - 1);
          setFollowed(!Followed);
        } else {
          alert("failed to unrfollow");
        }
      });
    } else {
      axios.post("/api/follow/followUser", variable).then((response) => {
        if (response.data.success) {
          setNumber(Number + 1);
          setFollowed(!Followed);
        } else {
          alert("failed to follow");
        }
      });
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleClick = () => {
    let variable = {
      userId: props.userId,
      createureId: props.idCreature,
      text: Message,
    };
    axios.post("/api/message/saveMessage", variable).then((res) => {
      if (res.data.success) {
        alert(`Votre message est envoyé "${res.data.msg.text}"`);
        setMessage("");
      }
    });
  };
  return (
    <div>
      {props.Adherent.User && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              size={100}
              src={`http://localhost:5000/${props.Adherent.userImage}`}
            />
          </div>

          <Descriptions title="Profile">
            <Descriptions.Item label="Nom">
              {`${props.Adherent.User.lastName}  
              ${props.Adherent.User.firstName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>{`${props.Adherent.User.email}`} </span>
                <span>
                  <span>{`${props.Adherent.Phone}`}</span>
                </span>
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Totale des événements">
              {`${props.Adherent.nbr_events}`}
            </Descriptions.Item>
            <Descriptions.Item label="À propos">
              {`${props.Adherent.aPropos}`}
            </Descriptions.Item>
          </Descriptions>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.user.isAuthenticated === false ? (
              <span>
                <button
                  style={{
                    backgroundColor: `${Followed ? "#AAAAAA" : "#CC0000"}`,
                    color: "white",
                    padding: "8px 13px",
                    fontWeight: "500",
                    fontSize: "1rem",
                    borderRadius: 50,
                    marginRight: 30,
                    border: 0,
                    outline: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {Followed ? "Followed" : "Follow"} ({Number})
                </button>
                <SendIcon />
              </span>
            ) : (
              <div>
                {props.userId && (
                  <div>
                    {props.userId.toString() === props.idCreature.toString() ? (
                      <span>
                        <button
                          style={{
                            backgroundColor: `${
                              Followed ? "#AAAAAA" : "#CC0000"
                            }`,
                            borderRadius: 50,
                            color: "white",
                            padding: "8px 13px",
                            fontWeight: "500",
                            fontSize: "1rem",
                            marginRight: 30,
                            border: 0,
                            outline: "none",
                            textTransform: "uppercase",
                          }}
                        >
                          {Followed ? "Followed" : "Follow"} ({Number})
                        </button>
                      </span>
                    ) : (
                      <span>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: `${
                                Followed ? "#AAAAAA" : "#CC0000"
                              }`,
                              borderRadius: 50,
                              color: "white",
                              padding: "8px 13px",
                              fontWeight: "500",
                              border: 0,
                              fontSize: "1rem",
                              marginTop: 33,
                              outline: "none",
                              marginRight: 30,
                              textTransform: "uppercase",
                            }}
                            onClick={handleFollow}
                          >
                            {Followed ? "Followed" : "Follow"} ({Number})
                          </button>
                          <div style={{ display: "flex" }}>
                            <form
                              className={classes.root}
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                id="standard-basic"
                                label="Envoyer un message"
                                onChange={handleChange}
                                value={Message}
                              />
                            </form>
                            <SendIcon
                              style={{
                                color: "blue",
                                marginTop: 40,
                                marginLeft: 20,
                                cursor: "pointer",
                              }}
                              onClick={handleClick}
                            />
                          </div>
                        </div>
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
    user: state.auth,
  };
};
export default connect(mapStateToProps)(Infos);
