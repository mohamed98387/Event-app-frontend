import React from "react";
import "./style.css";
import Navbar from "../nav-app/NavApp";
import RecentPosts from "./RecentPosts";
import Btp from "../Back-to-top/BackTop";
import Fotter from "../footer/Footer";
import Layout from "./Layout/index";

const blog = (props) => {
  return (
    <div>
      <Navbar navBlog={props.location.pathname} />
      <div style={{ marginTop: 150 }}>
        <Layout>
          <RecentPosts style={{ width: "70%" }} />
        </Layout>
      </div>
      <Btp />
      <Fotter />
    </div>
  );
};

export default blog;
