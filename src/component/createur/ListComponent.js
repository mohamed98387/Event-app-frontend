import React from "react";
import { Typography } from "antd";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const { Title } = Typography;

function ListComponent(props) {
  const renderTab = props.MyEvents.filter((el) => el.Validation === true).map(
    (el, i) => {
      const content = (
        <div>
          {el.EventImage ? (
            <img
              style={{ width: 300 }}
              src={`http://localhost:5000/${el.EventImage[0]}`}
              alt="event"
            />
          ) : (
            " no image"
          )}
        </div>
      );
      return (
        <tr key={i}>
          <Tooltip
            content={content}
            title={
              <div>
                <h5
                  style={{
                    backgroundColor: "white",
                    textAlign: "center",
                    color: "###",
                    fontFamily: "italic",
                  }}
                >
                  {el.Titre}
                </h5>
                <img
                  style={{
                    width: 280,
                    height: 200,
                    marginTop: -7,
                    fontWeight: 500,
                  }}
                  src={`http://localhost:5000/${el.EventImage[0]}`}
                  alt="event"
                />
              </div>
            }
          >
            <td style={{ textAlign: "center" }}>
              <Link
                style={{
                  listStyle: "none",
                  textDecoration: "none",
                  color: "#f82249",
                }}
                to={`/evenemet/${el.id}`}
              >
                {el.Titre}
              </Link>
            </td>
          </Tooltip>
          <td style={{ textAlign: "center" }}>
            {el.Type_event === 1 && "Sportif"}
            {el.Type_event === 2 && "Educatif"}
            {el.Type_event === 3 && "Scientifique"}
            {el.Type_event === 4 && "Culturel"}
            {el.Type_event === 5 && "Artisanat"}
            {el.Type_event === 6 && "Festivate"}
          </td>
          <td style={{ textAlign: "center" }}>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(el.Start_date)}
          </td>
          <td tyle={{ textAlign: "center" }}>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(el.End_date)}
          </td>
          <td style={{ textAlign: "center" }}>
            {el.Country} {el.City}
          </td>
        </tr>
      );
    }
  );

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Liste des événements </Title>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "center" }}> Titre </th>
            <th style={{ textAlign: "center" }}>Catégorie</th>
            <th style={{ textAlign: "center" }}>Date de début</th>
            <th style={{ textAlign: "center" }}>Date de fin</th>
            <th style={{ textAlign: "center" }}>Localisation</th>
          </tr>
        </thead>
        <tbody>{props.MyEvents && renderTab}</tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(ListComponent);
