import React from "react";
import "./style.css";
import Card from "../UI/Card";

const Sidebar = (props) => {
  // useEffect(() => {
  //   const posts = blogPost.data;
  //   setPosts(posts);
  // }, [posts]);

  return (
    <div
      className="sidebarContainer"
      style={{
        width: props.width,
      }}
    >
      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="cardHeader">
          <span>À PROPOS DE NOUS</span>
        </div>
        <div className="profileImageContainer">
          {/* <img src="xxxxx" alt="" /> */}
        </div>
        <div className="cardBody">
          <p className="personalBio">..............................</p>
        </div>
      </Card>

      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="cardHeader">
          <span>sponsor</span>
        </div>
      </Card>

      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="cardHeader">
          <span>resau sociaux</span>
        </div>

        <div className="recentPosts">
          <div className="recentPost">
            <h3>fb twiter insta ....</h3>
            <span></span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
