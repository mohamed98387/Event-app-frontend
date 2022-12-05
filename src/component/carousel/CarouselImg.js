import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../images/carousel/1.jpg";
import img2 from "../../images/carousel/2.jpg";
import img3 from "../../images/carousel/3.jpg";
import img4 from "../../images/carousel/4.jpg";
import img5 from "../../images/carousel/5.jpg";
import img6 from "../../images/carousel/6.jpg";
import img7 from "../../images/carousel/7.jpg";
import img8 from "../../images/carousel/8.jpg";
import img9 from "../../images/carousel/9.jpg";
import img10 from "../../images/carousel/10.jpg";
import "./carousel.css";

export default class CarouselImg extends Component {
  render() {
    return (
      <div className="carImg">
        <Carousel interval={1500}>
          <Carousel.Item>
            <img className="d-block w-100" src={img1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img2} alt="second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img3} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img4} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img5} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img6} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img7} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img8} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img9} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img10} alt="First slide" />
          </Carousel.Item>
        </Carousel>
        <div className="Texte">
          <h1 style={{ fontSize: "56px", fontWeight: "600" }}>
            ORGANISATION
            <br />
            <span>D'ÉVÉNEMENTS</span> EN TUNISIE
          </h1>
          <br />
        </div>
      </div>
    );
  }
}
