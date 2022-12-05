import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "antd";
const Adherents = (props) => {
  const [Users, setUsers] = useState([]);
  const getUsers = () => {
    axios.get("/api/adherent/allCreateures").then((res) => {
      if (res.data) {
        setUsers(
          res.data.filter((el) => el.User.email !== "chaieb.jasser@esprit.tn")
        );
      } else {
        alert("failed to grt users");
      }
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(props);
  const deleteUser = (id) => {
    axios
      .post(`/api/adherent/deleteUser/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch("failed to delete user");
    axios.delete(`/api/event/delete/${id}`);
    axios.delete(`/api/video/delete/${id}`);
  };

  const renderTab = Users.map((el, i) => {
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}>{el.User.userName}</td>
        <td style={{ textAlign: "center" }}> {el.User.firstName} </td>
        <td style={{ textAlign: "center" }}> {el.User.lastName} </td>
        <td style={{ textAlign: "center" }}> {el.User.email}</td>
        <td style={{ textAlign: "center" }}>
          {moment(el.createdAt).format("DD-MM-YYYY")}
        </td>
        <td style={{ textAlign: "center" }}>
          <Button onClick={() => deleteUser(el.User._id)}>Supprimer</Button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Username</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date d'inscription</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
};

export default Adherents;
