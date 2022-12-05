import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import LikeDislikes from "./LikesDsilikes";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
const { TextArea } = Input;

function SingleComment(props) {
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      userId: props.userId,
      videoId: props.postId,
      reponseA: props.comment._id,
      Text: CommentValue,
    };

    Axios.post("/api/commentVideo/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refrechFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Répondre
    </span>,
    <LikeDislikes
      comment
      commentId={props.comment._id}
      userId={props.userId}
    />,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.userId.userName}
        avatar={
          props.comment.userImage ? (
            <Avatar
              src={`http://localhost:5000/${props.comment.userImage}`}
              alt="image"
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: 48 }} />
          )
        }
        content={<p>{props.comment.Text}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
  };
};
export default connect(mapStateToProps)(SingleComment);
