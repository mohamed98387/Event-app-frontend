import React, { useState, useEffect } from "react";
import GridItem from "../profile/components@material/Grid/GridItem.js";
import GridContainer from "../profile/components@material/Grid/GridContainer.js";
// import queryString from "query-string";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import axios from "axios";
import NavApp from "../nav-app/NavApp";
import ChatIcon from "@material-ui/icons/Chat";
import BackToTop from "../Back-to-top/BackTop";
import { connect } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import "./details.css";
import { Button, Input } from "antd";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Chat from "../Chat/Chat/Chat";
import ReactLoading from "react-loading";
import { Tooltip } from "antd";
import { Link, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "antd";
import CommentChild from "./CommentChild";
import { getEventById } from "../../actions/actions";

const { TextArea } = Input;

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(221, 220, 220)",
    padding: -20,
    marginTop: "51px",
    width: "100%",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  width: {
    width: "100%",
    backgroundColor: "rgb(236, 236, 236)",
    border: "none",
  },
});
// import ReactLoading from "react-loading";
function Details(props) {
  const [searchstar, setSearchstar] = useState({ rating: 5 });
  const onStarClicktwo = (nextValue, prevValue, name) => {
    setSearchstar({ rating: nextValue });
  };
  const [Comment, setComment] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [userName, setuserName] = useState("");
  const [EventTitle, setEventTitle] = useState("");
  const [event, setEvent] = useState({});
  const [userId, setuserId] = useState({ id: "" });
  const [idCreateure, setIdCreateure] = useState("");
  const [favNumber, setFavNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [Res, setRes] = useState(0);
  const [adherent, setAdherent] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [eventid, setEventid] = useState({ eventId: "" });
  const [reserved, setReserved] = useState(false);
  const [allUser, setALlUser] = useState([]);

  const [variable, setVariable] = useState({
    userId: "",
    eventId: "",
    eventTitle: "",
    eventImage: "",
    startDate: "",
  });
  const classes = useStyles();
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variabl = { eventId: variable.eventid, userId: userId.id };

  const onLike = () => {
    if (LikeAction === null) {
      axios.post("/api/like/upLike", variabl).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        }
      });
    } else {
      axios.post("/api/like/unLike", variabl).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        }
      });
    }
  };
  const onDislike = () => {
    if (DislikeAction !== null) {
      axios.post("/api/like/unDisLike", variabl).then((response) => {
        if (response.data.success) {
          setDislikeAction(null);
          setDislikes(Dislikes - 1);
        }
      });
    } else {
      axios.post("/api/like/upDisLike", variabl).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
          setDislikeAction("disliked");
        }
      });
    }
  };
  useEffect(() => {
    if (variable.eventid !== undefined) {
      axios.post("/api/like/getLikes", variabl).then((response) => {
        if (response.data.success) {
          setLikes(response.data.likes.length);
          response.data.likes.map((like) => {
            if (like.userId === userId.id) {
              setLikeAction("liked");
            }
          });
        }
        axios.post("/api/like/getDislikes", variabl).then((response) => {
          if (response.data.success) {
            setDislikes(response.data.dislikes.length);
            response.data.dislikes.map((like) => {
              if (like.userId === userId.id) {
                setDislikeAction("disliked");
              }
            });
          }
        });
      });
    }
  }, [variable.eventid]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `/api/event/singleEvent/${props.match.params.id}`
      );

      setEvent(result.data);
      setVariable({
        userId: userId.id,
        eventId: event.id,
        eventid: event._id,
        eventTitle: event.Titre,
        eventImage: event.EventImage,
        startDate: event.Start_date,
      });
      setEventid({ eventId: event._id });
    };

    fetchData();
  }, [
    props.match.params.id,
    event.id,
    event.Titre,
    event.EventImage,
    event.Start_date,
    userId.id,
    event._id,
  ]);
  useEffect(() => {
    props.getEventById(props.match.params.id);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await axios(`/api/event/singleEvent/${props.match.params.id}`);
      if (props.user.isAuthenticated === true) {
        setEventTitle(event.Titre);
        setuserName(props.user.user.userName);
        setuserId({ id: props.user.user.id });
        setIdCreateure(event.User);
        setEventid(event._id);
      }

      props.adh && setAdherent(props.adh);
      props.users && setALlUser(props.users);
    };

    fetchData();
  }, [
    props.users,
    props.adh,
    event._id,
    props.user.user.id,
    event.User,
    props.user.user.userName,
    event.Titre,
    props.match.params.id,
    props.user.isAuthenticated,
  ]);
  useEffect(() => {
    axios.post("/api/fav/favoriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavNumber(response.data.favoriteNumber);
      }
    });
    axios.post("/api/fav/favorited", variable).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      }
    });
  }, [variable]);
  const onClickfav = () => {
    if (favorited) {
      axios.post("/api/fav/removeFromFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavNumber(favNumber - 1);
          setFavorited(!favorited);
        }
      });
    } else {
      axios.post("/api/fav/addToFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavNumber(favNumber + 1);
          setFavorited(!favorited);
        }
      });
    }
  };
  useEffect(() => {
    const variable = { eventId: event._id, userId: userId.id };
    axios.post("/api/reservation/reservationNumber", variable).then((res) => {
      if (res.data.success) {
        setRes(res.data.reservationNumber);
      }
    });
    axios.post("/api/reservation/reserved", variable).then((response) => {
      if (response.data.success) {
        setReserved(response.data.reservation);
      }
    });
  }, [userId.id, event._id]);

  const handleRes = () => {
    let variable = {
      eventId: event._id,
      userId: userId.id,
      idCreateure: idCreateure,
    };
    if (reserved) {
      axios.post("/api/reservation/unReserve", variable).then((response) => {
        if (response.data.success) {
          setRes(Res - 1);
          setReserved(!reserved);
        } else {
          alert("failed to unreserve");
        }
      });
    } else {
      axios.post("/api/reservation/reserve", variable).then((response) => {
        if (response.data.success) {
          setRes(Res + 1);
          setReserved(!reserved);
        } else {
          alert("failed to reserve");
        }
      });
    }
  };

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      text: Comment,
      userId: userId.id,
      eventId: event._id,
    };
    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        setCommentList(commentList.concat(response.data.result));
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  useEffect(() => {
    axios.post("/api/comment/getComments", eventid).then((response) => {
      if (response.data.success) {
        setCommentList(response.data.comments);
        setIsloading(true);
      } else {
        alert("Failed to get Comment");
      }
    });
  }, [eventid]);
  let myArray = [];
  const megreArray = () => {
    myArray = commentList.map((e) => {
      for (let element of adherent) {
        if (e.userId._id === element.User) Object.assign(e, element);
      }
      return e;
    });
  };
  megreArray();

  let currentAdh = adherent.filter((el) => el.User === event.User)[0];
  let currentUser = allUser.filter((el) => el._id === event.User)[0];
  return (
    <div>
      {isLoading ? (
        <div>
          <GridContainer style={{ width: "99%", paddingLeft: 70 }}>
            <NavApp navEvent={props.location.pathname} />
            <GridItem style={{ marginTop: 85 }} xs={12} sm={12} md={12}>
              <div className="container py-5">
                <div style={{ marginLeft: "-80px" }} className="row">
                  <div>
                    {event.EventImage && (
                      <img
                        src={`http://localhost:5000/${event.EventImage[0]}`}
                        className="img-fluid"
                        alt="event"
                        style={{
                          height: "400px",
                          width: "3000px",
                          marginTop: "-50px",
                          borderRadius: "10px",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </GridItem>
            <GridItem
              style={{ marginTop: -40, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={4}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.2rem",
                    textTransform: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {event.Titre}
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    fontFamily: "gras",
                    fontSize: 20,
                    fontStyle: "italic",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ marginTop: 10 }}>
                    Date debut:
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }).format(event.Start_date)}
                  </span>
                  <span style={{ marginTop: 10 }}>
                    Date fin:
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }).format(event.End_date)}
                  </span>
                </div>
              </div>
            </GridItem>
            <GridItem
              style={{ marginTop: -40, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={4}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h2
                  style={{
                    backgroundColor: "#f82249",
                    color: "white",
                    width: "60%",
                    marginTop: "10px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                >
                  {event.Type_event === 1 && "Sportif"}
                  {event.Type_event === 2 && "Educatif"}
                  {event.Type_event === 3 && "Scientifique"}
                  {event.Type_event === 4 && "Culturel"}
                  {event.Type_event === 5 && "Artisanat"}
                  {event.Type_event === 6 && "Festivate"}
                </h2>
              </div>
            </GridItem>
            <GridItem
              style={{ marginTop: -40, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={4}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.user.isAuthenticated === false ? (
                  <button
                    style={{
                      backgroundColor: `${reserved ? "#AAAAAA" : "#CC0000"}`,
                      borderRadius: 4,
                      color: "white",
                      padding: "8px 13px",
                      fontWeight: "500",
                      fontSize: "1rem",
                      marginLeft: -90,
                      marginRight: 30,
                      textTransform: "uppercase",
                    }}
                  >
                    {reserved ? "Réservé" : "Reservation"} ({Res})
                  </button>
                ) : (
                  <div>
                    {event.User && (
                      <div>
                        {props.user.user.id.toString() ===
                        event.User.toString() ? (
                          <button
                            style={{
                              backgroundColor: `${
                                reserved ? "#AAAAAA" : "#CC0000"
                              }`,
                              borderRadius: 4,
                              color: "white",
                              padding: "8px 13px",
                              fontWeight: "500",
                              fontSize: "1rem",
                              marginLeft: -90,
                              marginRight: 30,
                              textTransform: "uppercase",
                            }}
                          >
                            {reserved ? "Réservé" : "Reservation"} ({Res})
                          </button>
                        ) : (
                          <button
                            style={{
                              backgroundColor: `${
                                reserved ? "#AAAAAA" : "#CC0000"
                              }`,
                              borderRadius: 4,
                              color: "white",
                              padding: "8px 13px",
                              fontWeight: "500",
                              fontSize: "1rem",
                              marginLeft: -90,
                              marginRight: 30,
                              textTransform: "uppercase",
                            }}
                            onClick={handleRes}
                          >
                            {reserved ? "Réservé" : "Reservation"} ({Res})
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <StarRatingComponent
                  style={{ marginTop: "20px" }}
                  className="x"
                  name="rate1"
                  starCount={5}
                  value={searchstar.rating}
                  onStarClick={onStarClicktwo.bind(setSearchstar)}
                />
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <hr style={{ marginTop: -40, height: 15 }} />
            </GridItem>

            <GridItem
              style={{ marginTop: 13, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={6}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    marginLeft: 15,
                    fontStyle: "gras",
                    fontSize: 20,
                    fontFamily: "italic",
                  }}
                >
                  Description :
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: "auto",
                    padding: "10px",
                    fontSize: "1.2em",
                    fontFamily: "italic",
                    wordWrap: "break-word",
                    color: "rgb(31, 31, 31)",
                  }}
                >
                  {event.Description}
                </p>
              </div>
            </GridItem>

            <GridItem
              style={{
                marginTop: -40,
                marginBottom: 45,
                height: 300,
              }}
              xs={12}
              sm={6}
              md={3}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 51,
                }}
              >
                {event.EventImage && (
                  <img
                    style={{
                      height: 300,
                      borderRadius: "10px",
                      width: "100%",
                    }}
                    src={`http://localhost:5000/${event.EventImage[0]}`}
                    alt="map"
                  />
                )}
              </div>
            </GridItem>
            <GridItem
              style={{
                marginTop: -40,
                marginBottom: 45,
                height: 300,
              }}
              xs={12}
              sm={6}
              md={3}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {currentAdh && currentUser && (
                  <Card
                    className={classes.root}
                    style={{ height: 300 }}
                    variant="outlined"
                  >
                    <CardContent>
                      <Typography
                        style={{ textAlign: "center" }}
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Créateur d'événement
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-betwen",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          style={{ height: "60px", width: "23%" }}
                          src={`http://localhost:5000/${currentAdh.userImage}`}
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <span
                            style={{
                              marginLeft: "20px",
                              fontSize: 18,
                              fontFamily: "italic",
                            }}
                          >
                            {currentUser.firstName}
                          </span>
                          <span
                            style={{
                              marginLeft: "20px",
                              fontSize: 18,
                              fontFamily: "italic",
                            }}
                          >
                            {currentUser.lastName}
                          </span>
                        </div>
                        <hr
                          style={{
                            marginTop: -0.01,
                            fontSize: 10,
                            marginLeft: 18,
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <h6 style={{ marginBottom: 15 }}>
                          {currentUser.email}
                        </h6>
                        <h6 style={{ marginBottom: 15 }}>{currentAdh.Phone}</h6>
                        <h6 style={{ marginBottom: 15 }}>
                          {currentAdh.Gouvernorat}
                        </h6>
                        <h6 style={{ marginBottom: 15 }}>{currentAdh.Ville}</h6>
                        <h6>{currentAdh.Zip_Code}</h6>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </GridItem>
            <GridItem style={{ marginTop: 30, display: "flex" }}>
              <div style={{ marginTop: 36 }}>
                <span key="comment-basic-like">
                  <Tooltip title="Like">
                    {LikeAction === "liked" ? (
                      <ThumbUpAltIcon
                        style={{ cursor: "pointer" }}
                        onClick={onLike}
                      />
                    ) : (
                      <ThumbUpAltOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={onLike}
                      />
                    )}
                  </Tooltip>
                  <span style={{ paddingLeft: "8px", cursor: "auto" }}>
                    {Likes}
                  </span>
                </span>
                &nbsp;&nbsp;
                <span key="comment-basic-dislike">
                  <Tooltip title="Dislike">
                    {DislikeAction === "disliked" ? (
                      <ThumbDownIcon
                        style={{ cursor: "pointer" }}
                        onClick={onDislike}
                      />
                    ) : (
                      <ThumbDownAltOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={onDislike}
                      />
                    )}
                  </Tooltip>
                  <span style={{ paddingLeft: "8px", cursor: "auto" }}>
                    {Dislikes}
                  </span>
                </span>
              </div>

              {props.user.isAuthenticated === false ? (
                <button
                  style={{
                    backgroundColor: "rgba(6, 12, 34, 0.98)",
                    color: "white",
                    borderRadius: "10px",
                    borderColor: "transparent",
                    marginTop: "30px",
                    height: 40,
                    marginLeft: 30,
                    outline: "none",
                  }}
                >
                  {favorited ? "Supprimer de fav" : "Ajouter au Fav"} (
                  {favNumber})
                </button>
              ) : (
                <div>
                  {event.User && (
                    <div>
                      {props.user.user.id.toString() ===
                      event.User.toString() ? (
                        <button
                          style={{
                            backgroundColor: "rgba(6, 12, 34, 0.98)",
                            color: "white",
                            borderRadius: "10px",
                            borderColor: "transparent",
                            marginTop: "30px",
                            height: 40,
                            marginLeft: 30,
                            outline: "none",
                          }}
                        >
                          {favorited ? "Supprimer de fav" : "Ajouter au Fav"} (
                          {favNumber})
                        </button>
                      ) : (
                        <button
                          onClick={onClickfav}
                          style={{
                            backgroundColor: "rgba(6, 12, 34, 0.98)",
                            color: "white",
                            borderRadius: "10px",
                            borderColor: "transparent",
                            marginTop: "30px",
                            height: 40,
                            marginLeft: 30,
                            outline: "none",
                          }}
                        >
                          {favorited ? "Supprimer de fav" : "Ajouter au Fav"} (
                          {favNumber})
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </GridItem>
            <GridItem style={{ marginBottom: 100 }} xs={12}>
              <div>
                <br />
                <p> replies</p>
                <hr />
                {myArray &&
                  myArray.map((el, i) => (
                    <React.Fragment key={i}>
                      <CommentChild el={el} />
                    </React.Fragment>
                  ))}
                <form
                  style={{ display: "flex", marginTop: 30 }}
                  onSubmit={onSubmit}
                >
                  <TextArea
                    style={{ width: "90%", borderRadius: "5px" }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                  />
                  <br />
                  <Button
                    onClick={onSubmit}
                    style={{ width: "10%", height: "52px" }}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </GridItem>
          </GridContainer>
          {props.user.isAuthenticated ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 140,
              }}
            >
              <Link
                onClick={(e) =>
                  !userName || !EventTitle ? e.preventDefault() : null
                }
                to={`/evenemet/${event.id}/chat/room=${EventTitle}&name=${userName}`}
              >
                <ChatIcon
                  style={{ fontSize: 60, position: "fixed", bottom: "1.2%" }}
                />
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 140,
              }}
            >
              <Link to={`/evenemet/${event.id}`}>
                <ChatIcon
                  style={{ fontSize: 60, position: "fixed", bottom: "1.2%" }}
                />
              </Link>
            </div>
          )}

          <Route
            path="/evenemet/:id/chat/:user"
            render={(props) => <Chat {...props} id={event.id} />}
          />
          <BackToTop />
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
          <ReactLoading type="balls" height={100} width={100} color="#f82249" />
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    event: state.Reducer1,
    user: state.auth,
    adh: state.EventReducer.allAdherents,
    users: state.EventReducer.allUsers,
  };
};
export default connect(mapStateToProps, {
  getEventById,
})(Details);
