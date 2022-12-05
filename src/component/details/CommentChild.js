import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Comment, Avatar } from "antd";

import { connect } from "react-redux";

function CommentChild(props) {
  return (
    <div>
      {props.el.userImage ? (
        <div>
          <Comment
            author={props.el.userId.userName}
            avatar={
              props.el.userImage ? (
                <Avatar
                  src={`http://localhost:5000/${props.el.userImage}`}
                  alt="Avatar"
                />
              ) : (
                <Avatar
                  src={`http://localhost:5000/${props.comment.userImage}`}
                  alt="image"
                />
              )
            }
            content={<p> {props.el.text} </p>}
          ></Comment>
        </div>
      ) : (
        <div>
          <Comment
            author={props.el.userId.userName}
            avatar={
              props.el.userImage ? (
                <Avatar
                  src={`http://localhost:5000/${props.el.userImage}`}
                  alt="daz"
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: 48 }} />
              )
            }
            content={<p> {props.el.text} </p>}
          ></Comment>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(CommentChild);
