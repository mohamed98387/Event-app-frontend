import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { connect } from "react-redux";
import "./chat.css";
import InfoBar from "./infobar/InfoBar";
import Input from "./Input/Input";
import Messages from "./messages/Messages";

let socket;

const Chat = ({ match: { params }, id }) => {
  const ENDPOINT = "localhost:5000";
  const [userName, setUserName] = useState("");
  const [eventTitle, setEventTite] = useState("");
  // const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { event, userName } = queryString.parse(params.user);

    socket = io(ENDPOINT);
    setEventTite(event);
    setUserName(userName);

    socket.emit("join", { event, userName }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, params.user]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(messages, message);
  return (
    <div className="outerContainer">
      <div className="containerChat">
        <InfoBar id={id} eventTitle={eventTitle} />
        <Messages messages={messages} name={userName} />
        <Input
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Chat);

//  <div>
// <Launcher
//   agentProfile={{
//     teamName: "react-chat-window",
//   }}
//   onMessageWasSent={_onMessageWasSent}
//   messageList={messageList}
//   showEmoji
//   height="300px"
// />
// </div>
//   const _onMessageWasSent = (message) => {
//     setMessageList([...messageList, message]);
//   };

//   const _sendMessage = (text) => {
//     if (text.length > 0) {
//       setMessageList({
//         messageList: [
//           messageList,
//           {
//             author: "them",
//             type: "text",
//             data: { text },
//           },
//         ],
//       });
//     }
//   };
