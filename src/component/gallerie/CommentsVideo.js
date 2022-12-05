import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import SingleComment from "./SingleCommentComponent";
import ReplyComment from "./ReplyComments";

const { TextArea } = Input;

function Comments(props) {
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      Text: Comment,
      userId: props.userId,
      videoId: props.videoId,
    };

    axios.post("/api/commentVideo/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refrechFunction(response.data.result);
      }
    });
  };

  return (
    <div style={{ width: "90%", paddingLeft: "2rem" }}>
      <br />
      <p> Commentaires:</p>
      <hr />

      {props.CommentList &&
        props.CommentList.map(
          (comment, index) =>
            !comment.reponseA && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  postId={props.videoId}
                  refrechFunction={props.refrechFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentList}
                  postId={props.videoId}
                  parentCommentId={comment._id}
                  refrechFunction={props.refrechFunction}
                />
              </React.Fragment>
            )
        )}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(Comments);
