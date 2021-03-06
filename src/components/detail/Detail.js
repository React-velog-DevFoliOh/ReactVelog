import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Header/Header";
import Comment from "./Comment";
import Modal from "../common/Modal";
import { Tag, Button } from "../common/styledComponent";
import { Theme } from "../../theme/theme";

// import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import "./detail.scss";
import { renderDateString } from "../common/commonFunctions";

// import { useConfirm } from "../common/useConfirm";

function Detail({ getPosts }) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [inputComment, setInputComment] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getPost(postId);
    getComments(postId);
  }, []);

  const serverUrl = "https://limitless-sierra-67996.herokuapp.com/v1";

  const getPost = async (id) => {
    await fetch(`${serverUrl}/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setPost(result))
      .catch((error) => console.log("error", error));
  };

  const getComments = (postId) => {
    fetch(`${serverUrl}/comments?postId=${postId}&limit=10&page=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setComments(result.results);
      })
      .catch((err) => console.error(err));
  };

  const deletePost = async (postId) => {
    await fetch(`${serverUrl}/posts/${postId}`, {
      method: "Delete",
      headers: {
        accept: "*/*",
      },
    }).catch((err) => console.error(err));
    navigate("/");
    getPosts();
  };

  const goEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const onDelete = () => {
    setModal(true);
  };

  const renderTags = (tags) => {
    if (tags) return tags.map((tag) => <Tag>{tag}</Tag>);
  };

  const renderThumbnail = (thumbnail) => {
    if (thumbnail) {
      return <img className="thumbnail" src={thumbnail} alt="" />;
    }
  };

  const renderBody = (body) => {
    if (body) {
      return <p className="content">{body}</p>;
    }
  };

  const inputCommentRef = useRef();
  const onInput = (e) => {
    setInputComment(e.target.value);
  };

  const submitComment = async (mode, message, id) => {
    let data = {};
    switch (mode) {
      case "create":
        data = { postId, body: message };
        await fetch(serverUrl + "/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        break;
      case "update":
        data = { body: message };
        await fetch(serverUrl + "/comments/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        break;
      case "delete":
        await fetch(serverUrl + "/comments/" + id, {
          method: "DELETE",
        });
        break;
      default:
        console.log("Submit Comment has Error");
    }
    getComments(postId);
    inputCommentRef.current.value = "";
  };

  const renderComments = () => {
    return (
      comments &&
      Object.keys(comments).map((key) => (
        <Comment key={key} comment={comments[key]} submitComment={submitComment} />
      ))
    );
  };

  return (
    <div class="container">
      <Header getPosts={getPosts} />
      <Theme.Container className="detail">
        <div className="head">
          <h1 className="title">{post?.title}</h1>
          <div className="tools">
            <span className="edit" onClick={goEdit}>
              ??????
            </span>
            <span className="delete" onClick={onDelete}>
              ??????
            </span>
            {modal && (
              <Modal
                title={"????????? ??????"}
                message={"????????? ?????????????????????????"}
                onConfirm={() => {
                  deletePost(postId);
                }}
                onCancel={() => {
                  setModal(false);
                }}
              />
            )}
          </div>
          <span className="time">{renderDateString(post?.updatedAt)}</span>
          <div className="tags">{renderTags(post?.tags)}</div>
        </div>
        <div className="body">
          {renderThumbnail(post?.thumbnail)}
          {renderBody(post?.body)}
        </div>
        <div className="foot">
          {/* <div className="prev_next">
            <div>{renderPrev()}</div>
            <div>{renderNext()}</div>
          </div> */}
          <div className="comments">
            <h4>{comments?.length || "0"}?????? ?????? </h4>
            <Theme.TextArea
              ref={inputCommentRef}
              onInput={(e) => onInput(e)}
              placeholder="????????? ???????????????"
            ></Theme.TextArea>
            <div>
              <Button
                onClick={() => {
                  submitComment("create", inputComment);
                }}
              >
                ?????? ??????
              </Button>
            </div>
          </div>
          <div className="commentsList">{renderComments()}</div>
        </div>
      </Theme.Container>
    </div>
  );
}

export default Detail;
