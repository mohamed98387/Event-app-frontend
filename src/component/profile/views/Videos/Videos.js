import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";

import Spinner from "react-bootstrap/Spinner";
const { TextArea } = Input;

const Catogory = [
  { value: 0, label: "Scientifique" },
  { value: 1, label: "Educatif" },
  { value: 2, label: "Music" },
  { value: 3, label: "Artisanat" },
  { value: 4, label: "Sport" },
  { value: 5, label: "Culturel " },
];

function UploadVideoPage(props) {
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Categories, setCategories] = useState("Scientifique");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [Loading, setLoading] = useState(true);
  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };
  const notification = (infos) => {
    let varaible = {
      text: `${props.user} à ajouter un nouveau vidéo`,
      Titre: infos.Titre,
      to: "admin",
    };
    axios
      .post("/api/notification/saveNotification", varaible)
      .then((res) => {});
  };
  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value);
  };

  const handleSelect = (event) => {
    setCategories(event.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.filePath);

        axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.thumbsFilePath);
            setLoading(true);
          } else {
            alert("faled to make the thumbnails");
          }
        });
      } else {
        alert("failed to save video");
      }
    });
    setLoading(false);
  };

  const onSubmit = (e) => {
    if (
      title === "" ||
      Description === "" ||
      Categories === "" ||
      FilePath === ""
    ) {
      alert("all filed are required");
    }
    const variables = {
      createure: props.id,
      Titre: title,
      categorie: Categories,
      filePath: FilePath,
      description: Description,
      thumbnail: Thumbnail,
      durée: Duration,
    };
    e.preventDefault();
    axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        alert("Vidéo ajoutée avec succès! veuillez attendre la confirmation ");
        notification(variables);

        props.history.push(`/Profile/VideoList/${props.id}`);
      } else {
        alert("failed to save video");
      }
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <Form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Dropzone
              onDrop={onDrop}
              accept="video/*"
              multiple={false}
              maxSize={8000000000000000000}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <AddCircleIcon style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>
            <div>
              {Loading ? (
                <div>
                  {Thumbnail !== "" && (
                    <div>
                      <img
                        src={`http://localhost:5000/${Thumbnail}`}
                        alt="thumbnail"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    right: "25%",
                    top: "31%",
                    alignItems: "center",
                    position: "fixed",
                  }}
                >
                  <Spinner animation="border" />
                </div>
              )}
            </div>
          </div>
          <br />
          <br />
          <label>Titre</label>
          <Input onChange={handleChangeTitle} value={title} />

          <br />
          <br />
          <label>Description</label>
          <TextArea onChange={handleChangeDecsription} value={Description} />

          <br />
          <br />
          <label>Catégorie</label>
          <select onChange={handleSelect}>
            {Catogory.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={onSubmit} type="danger" size="large">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    id: state.auth.user.id,
    user: state.auth.user.userName,
  };
};
export default connect(mapStateToProps)(UploadVideoPage);
