import React from "react";

import onlineIcon from "../../../images/icons/onlineIcon.png";
import closeIcon from "../../../images/icons/closeIcon.png";
import { Link } from "react-router-dom";
import "./InfoBar.css";

const InfoBar = ({ room, id }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <Link to={`/evenemet/${id}`}>
        <img src={closeIcon} alt="close icon" />
      </Link>
    </div>
  </div>
);

export default InfoBar;
