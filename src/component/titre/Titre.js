import React from "react";
import "./Titre.css";
const Titre = (props) => {
  return (
    <div className="section-header">
      <h2
        style={{
          fontSize: "36px",
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {props.titre}
      </h2>
    </div>
  );
};

export default Titre;
