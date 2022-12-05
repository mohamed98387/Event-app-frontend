import React from "react";
import { Carousel } from "antd";
const ImageSlider = (props) => {
  return (
    <div>
      <Carousel autoplay dots={false}>
        {props.data.EventImage.map((el, i) => (
          <div key={i}>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                alt="eventImahge"
                className="card-img-top"
                style={{
                  height: 200,
                  width: "78%",
                  marginTop: "-20px",
                  textAlign: "center",
                }}
                src={`http://localhost:5000/${el}`}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
