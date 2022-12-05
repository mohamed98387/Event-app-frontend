import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./Image.css";
const Carousel = (props) => {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (props.array && props.array.length > 0) {
      let images = [];
      props.array &&
        props.array.map((item) => {
          return images.push({
            original: `http://localhost:5000/${item}`,
            thumbnail: `http://localhost:5000/${item}`,
          });
        });
      setImages(images);
    }
  }, [props.array]);

  return (
    <div style={{ marginTop: -50 }}>
      {props.array.length > 0 && (
        <ImageGallery
          className="image-gallery-slide"
          showThumbnails={false}
          showBullets={true}
          autoPlay={true}
          items={Images}
        />
      )}
    </div>
  );
};

export default Carousel;
