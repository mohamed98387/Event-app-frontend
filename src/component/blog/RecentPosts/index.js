import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import Card from "../UI/Card";
const RecentPosts = (props) => {
  const [Blogs, setBlogs] = useState([]);
  const GetBlog = () => {
    axios.get("/api/blog").then((res) => {
      setBlogs(res.data);
    });
  };

  useEffect(() => {
    GetBlog();
  }, []);
  return (
    <div style={props.style}>
      {Blogs.map((el, i) => (
        <Card key={i} style={{ marginBottom: "20px" }}>
          <div style={{ padding: 10 }} className="postImageWrapper">
            <img
              style={{ borderRadius: 10 }}
              src={`http://localhost:5000/${el.filePath}`}
              alt=""
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <h2 style={{ marginTop: 10 }}>{el.Titre}</h2>

            <p
              style={{
                width: "100%",
                margin: "auto",
                padding: "20px",
                textAlign: "left",
                fontSize: "1rem",
                marginTop: -20,
                wordWrap: "break-word",
              }}
            >
              {el.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecentPosts;
