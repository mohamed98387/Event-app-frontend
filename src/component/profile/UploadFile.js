import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
const UploadFile = (props) => {
  const [image, setImage] = useState("");
  const onDrop = (file) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", file[0]);
    axios
      .post("/api/adherent/uploadImage", formData, config)
      .then((response) => {
        if (response.data.success) {
          setImage(response.data.image);
          props.refrechFunction(response.data.image);
        } else {
          alert("Failed to save the image in server");
        }
      });
  };

  return (
    <div>
      <Dropzone
        accept="image/*"
        image={image}
        onDrop={onDrop}
        multiple={false}
        maxSize={8000000}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              marginTop: -2,
              width: "100%",
              height: 50,
              borderBottom: "1.5px solid lightgray",
              display: "flex",
              alignItmes: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PhotoCamera
              color="primary"
              style={{ fontSize: "2rem", marginTop: 8 }}
            />
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadFile;
