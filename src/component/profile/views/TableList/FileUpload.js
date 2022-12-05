import React, { useState } from "react";
import Dropzone from "react-dropzone";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the node server
    Axios.post("/api/event/uploadImage", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.image]);
        props.refreshfunction([...Images, response.data.image]);
      } else {
        alert("failed to save the image in server");
      }
    });
  };
  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshfunction(newImages);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Dropzone
        accept="image/*"
        onDrop={onDrop}
        multiple={false}
        maxSize={800000000}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "250px",
              height: "200px",
              border: "1px solid lightgray",
              diplay: "flex",
              alignItems: "center",
              marginTop: "20px",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <AddIcon
              style={{
                fontSize: "80px",
                marginLeft: "85px",
                marginTop: "60px",
              }}
            />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "280px",
          height: "200px",
          overflowX: "scroll",
          marginTop: "20px",
        }}
      >
        {Images.map((image, index) => (
          <div key={index} onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: "280px", width: "280px", height: "200px" }}
              src={`http://localhost:5000/${image}`}
              alt={`eventImg=${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default FileUpload;
