import React, { useState } from "react";
import "./Newslater.css";
import Titre from "../titre/Titre";
import axios from "axios";
const Newslater = (props) => {
  const [email, setemail] = useState("");
  const handleChange = (e) => {
    setemail(e.target.value);
  };
  const submilt = (e) => {
    let varibale = { email: email };
    e.preventDefault();
    if (email === "") {
      alert("Entrez votre email");
    } else {
      axios.post("/newsLetter", varibale).then((res) => {
        alert("Merci de nous rejoindre");
      });
    }

    setemail("");
  };
  return (
    <section id="subscribe">
      <Titre titre="NewsLetter" />
      <div className="container">
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <form onSubmit={submilt}>
            <div className="form-row justify-content-center">
              <div className="col-auto">
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  placeholder="Enter votre Email"
                  onChange={handleChange}
                />
              </div>
              <div className="col-auto">
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newslater;
