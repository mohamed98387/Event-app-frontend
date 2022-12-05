import React from "react";
import { Link } from "react-router-dom";

import "./Image.css";
import logo1 from "../../images/social/fb.png";
import logo2 from "../../images/social/twit.png";
import logo3 from "../../images/social/in.png";
import logo4 from "../../images/social/g+.png";
const CreateurImage = (props) => {
  return (
    <div className="speaker">
      <img
        style={{ height: 250 }}
        src={`http://localhost:5000/${props.data.userImage}`}
        alt="1"
      />
      <div className="details">
        <h3>
          <Link to={`/active/User/${props.data.User._id}`}>
            {`${props.data.User.lastName} ${props.data.User.firstName}`}{" "}
          </Link>
        </h3>
        <p></p>
        <div className="social">
          <a href="s">
            <img src={logo1} style={{ marginTop: -8.7 }} alt="fb" />
          </a>
          <a href="1">
            <img style={{ height: 25 }} src={logo2} alt="twt" />
          </a>
          <a href="s">
            <img src={logo3} style={{ height: 35, width: 27 }} alt="in" />
          </a>
          <a href="g+">
            <img
              src={logo4}
              style={{
                height: 35,
                width: 27,
                marginLeft: -1.5,
              }}
              alt="l1"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreateurImage;
