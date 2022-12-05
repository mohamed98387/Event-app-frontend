import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Axios from "axios";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.videoId) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }
  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        setDislikes(response.data.dislikes.length);

        response.data.dislikes.map((like) => {
          if (like.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      }
    });
  }, []);
  const onLike = () => {
    if (LikeAction === null) {
      Axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        }
      });
    } else {
      Axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        }
      });
    }
  };
  const onDislike = () => {
    if (DislikeAction !== null) {
      Axios.post("/api/like/unDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikeAction(null);
          setDislikes(Dislikes - 1);
        }
      });
    } else {
      Axios.post("/api/like/upDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
          setDislikeAction("disliked");
        }
      });
    }
  };
  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {LikeAction === "liked" ? (
            <ThumbUpAltIcon onClick={onLike} />
          ) : (
            <ThumbUpAltOutlinedIcon onClick={onLike} />
          )}
          {/* <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            
          /> */}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          {DislikeAction === "disliked" ? (
            <ThumbDownIcon onClick={onDislike} />
          ) : (
            <ThumbDownAltOutlinedIcon onClick={onDislike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislikes;
