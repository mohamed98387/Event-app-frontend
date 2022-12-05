import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "antd";
const Users = () => {
  const [Users, setUsers] = useState([]);
  const getUsers = () => {
    axios.get("/api/users/all").then((res) => {
      if (res.data) {
        setUsers(res.data.filter((el) => el.email !== "chaieb.jasser@esprit.tn"));
      } else {
        alert("failed to grt users");
      }
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`/api/users/deleteUser/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch("failed to delete user");
    axios.post(`/api/adherent/deleteUser/${id}`);
    axios.delete(`/api/event/delete/${id}`);
    axios.delete(`/api/video/delete/${id}`);
  };

  const renderTab = Users.map((el, i) => {
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}> {el.userName} </td>
        <td style={{ textAlign: "center" }}> {el.firstName} </td>
        <td style={{ textAlign: "center" }}> {el.lastName} </td>
        <td style={{ textAlign: "center" }}> {el.email}</td>
        <td style={{ textAlign: "center" }}>
          {moment(el.createdAt).format("DD-MM-YYYY")}
        </td>
        <td style={{ textAlign: "center" }}>
          <Button onClick={() => deleteUser(el._id)}>Supprimer</Button>
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

export default Users;
