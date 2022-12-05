import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { connect } from "react-redux";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import { addMessage } from "../../../actions/ChatActions";

import "./Chat.css";

let socket;

const Chat = ({ match: { params }, id, addMessage }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000/";

  useEffect(() => {
    const { room, name } = queryString.parse(params.user);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, params.user]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="containerChat">
        <InfoBar id={id} room={room} />
        <Messages messages={messages} name={name} />
        <Input
          room={room}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          name={name}
          users={users}
        />
      </div>
    </div>
  );
};

export default connect(null, { addMessage })(Chat);
