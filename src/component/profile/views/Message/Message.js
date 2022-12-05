import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "antd";
const Message = () => {
  const [Message, setMessage] = useState([]);
  const getMessage = () => {
    axios.post("/api/message/getMessage").then((res) => {
      if (res.data.success) {
        setMessage(res.data.message);
      }
    });
  };
  useEffect(() => {
    getMessage();
  }, []);
  const handleDelte = (id) => {
    axios.delete(`/api/message/delete/${id}`).then((res) => {
      getMessage();
    });
  };
  const renderTab = Message.map((el, i) => {
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}>
          {`${el.userId.firstName} ${el.userId.lastName}`}
        </td>
        <td style={{ textAlign: "center" }}> {el.text} </td>
        <td style={{ textAlign: "center" }}>
          {moment(el.createdAt).format("DD-MM-YYYY")}
        </td>
        <td style={{ textAlign: "center" }}>
          <Button onClick={() => handleDelte(el._id)}>Retirer</Button>
        </td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr style={{ textAlign: "center" }}>
          <th> Nom et Prénom de l'expéditeur</th>
          <th>Message</th>
          <th>Date</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>{renderTab}</tbody>
    </table>
  );
};

export default Message;
