import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Button, Form, Input } from "antd";
import Card from "@material-ui/core/Card";

import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
const { TextArea } = Input;
const Blog = () => {
  const [FilePath, setFilePath] = useState("");
  const [Blogs, setBlogs] = useState([]);
  const [infos, setinfos] = useState({
    Titre: "",
    description: "",
  });
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/blog/uploadblog", formData, config).then((response) => {
      if (response.data.success) {
        setFilePath(response.data.filePath);
      } else {
        alert("failed to save video");
      }
    });
  };
  const handleChange = (e) => {
    setinfos({ ...infos, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    if (infos.Titre === "" || infos.description === "" || FilePath === "") {
      alert("all filed are required");
    }
    const variables = {
      Titre: infos.Titre,
      filePath: FilePath,
      description: infos.description,
    };
    e.preventDefault();
    axios.post("/api/blog/upload", variables).then((response) => {
      if (response.data.success) {
        alert("blog est ajoutée ");
        setinfos({ ...infos, Titre: "", description: "" });
        setFilePath("");
        GetBlog();
      }
    });
  };
  const GetBlog = () => {
    axios.get("/api/blog").then((res) => {
      setBlogs(res.data);
    });
  };
  const deleteBlog = (id) => {
    axios.delete(`/api/blog/${id}`).then((res) => {
      GetBlog();
    });
  };
  useEffect(() => {
    GetBlog();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Form onSubmit={onSubmit} style={{ width: "90%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone
              accept="image/*"
              onDrop={onDrop}
              multiple={false}
              maxSize={80000000000}
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
                  <CameraEnhanceIcon />
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
            <div>
              {FilePath !== "" && (
                <img
                  style={{ height: 240, width: 300 }}
                  src={`http://localhost:5000/${FilePath}`}
                  alt="blog"
                />
              )}
            </div>
          </div>
          <label>Titre</label>
          <Input name="Titre" value={infos.Titre} onChange={handleChange} />

          <br />
          <br />
          <label>Description</label>
          <TextArea
            name="description"
            value={infos.description}
            onChange={handleChange}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={onSubmit}
              style={{ marginTop: 35 }}
              type="danger"
              size="large"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div>
        {Blogs.map((el) => (
          <Card style={{ marginBottom: "20px", marginTop: 30 }}>
            <div className="postImageWrapper">
              <img
                style={{ width: "100%", height: "100%" }}
                src={`http://localhost:5000/${el.filePath}`}
                alt=""
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <h2 style={{ marginTop: 10 }}>{el.Titre}</h2>

              <div>
                <p
                  style={{
                    width: "100%",
                    margin: "auto",
                    padding: "10px",
                    textAlign: "left",
                    fontSize: "1rem",
                    fontFamily: "italic",
                    wordWrap: "break-word",
                  }}
                >
                  {el.description}
                </p>
              </div>
              <Button
                onClick={() => deleteBlog(el._id)}
                style={{ marginBottom: 20 }}
              >
                Supprimer
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
