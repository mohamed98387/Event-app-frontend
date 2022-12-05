import React from "react";
import { connect } from "react-redux";
import { addMessage } from "../../../actions/ChatActions";
import "./Input.css";

const Input = ({
  setMessage,
  sendMessage,
  message,
  addMessage,
  room,
  name,
}) => {
  const handlePress = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
      addMessage({ text: message, Room: room, userName: name });
    }
  };
  const handleClick = (e) => {
    sendMessage(e);
    addMessage({ text: message, Room: room, userName: name });
  };

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={handlePress}
      />
      <button className="sendButton" onClick={handleClick}>
        Send
      </button>
    </form>
  );
};
export default connect(null, { addMessage })(Input);
