import React from "react";
import "./BackTop.css";
import btTop from "../../images/bbtt.png";
import BackToTop from "react-back-to-top-button";
const BackTop = props => {
  return (
    <BackToTop showOnScrollDown showAt={250} speed={1000} easing="easeOutSine">
      <img style={{ btTop }} className="button" src={btTop} alt="btTop" />
    </BackToTop>
  );
};

export default BackTop;
