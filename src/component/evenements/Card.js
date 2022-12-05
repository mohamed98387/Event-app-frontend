import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";
function Card(props) {
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/users/all`)
      .then((res) => res.json())
      .then((json) => setLoading(true));
  }, [props.event.allAdherents]);

  return (
    <div>
      {Loading && (
        <div>
          <ProductWrapper>
            <div
              className="card"
              style={{
                textAlign: "center",
                height: "350px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <div>
                <CardHeader
                  avatar={
                    <Avatar
                      style={{ height: 60, width: 60, textAlign: "center" }}
                      aria-label="recipe"
                    >
                      <img
                        style={{ height: 60, width: 60 }}
                        alt=".."
                        src={`http://localhost:5000/${props.data.userImage}`}
                      />
                    </Avatar>
                  }
                  title={
                    <span
                      style={{
                        display: "flex",
                        width: "50%",
                        fontWeight: 500,
                        fontFamily: "italic",
                        justifyContent: "space-around",
                      }}
                    >
                      <h6> {props.data.User.lastName} </h6>
                      <h6>{props.data.User.firstName}</h6>
                    </span>
                  }
                />

                <div
                  className="img-container"
                  style={{ width: "100%", marginTop: "5px", height: "250px" }}
                >
                  <ImageSlider data={props.data} />

                  <div
                    className="card-footer"
                    style={{
                      width: "100%",
                      height: "50px",
                      marginLeft: "1px",
                      marginTop: "18px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "permanent Marker, cursive",
                        letterSpacing: "0.3rem",
                        textTransform: "uppercase",
                        marginTop: "15px",
                      }}
                    >
                      <Link to={`/evenemet/${props.data.id}`}>
                        {props.data.Titre}
                      </Link>
                    </p>

                    <h6 style={{ marginTop: -20 }}>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }).format(props.data.Start_date)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </ProductWrapper>
        </div>
      )}
    </div>
  );
}
const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgb(233, 233, 233);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.1);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0rem 0.4rem;

    background: var(--lightBleu);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
    transition: all 1s linear;
  }
  .cart-btn:hover {
    color: var(--mainBleu);
    cursor: pointer;
  }
`;
const mapStateToProps = (state) => {
  return {
    event: state.EventReducer,
    linkEvent: state.Reducer1,
    user: state.auth.allAdherents,
  };
};

export default connect(mapStateToProps)(Card);
