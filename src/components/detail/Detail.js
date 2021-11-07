import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Header/Header";
import Comment from "./Comment";
import Modal from "../common/Modal";
import { Tag, Button } from "../common/styledComponent";
// import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import "./detail.scss";
import { renderDateString } from "../common/commonFunctions";

// import { useConfirm } from "../common/useConfirm";

function Detail({ posts }) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [inputComment, setInputComment] = useState();
  const [modal, setModal] = useState(false);

  // const [prevPost, setPrevPost] = useState();
  // const [nextPost, setNextPost] = useState();

  // useEffect(() => {
  //   setPost(
  //     posts.filter((post) => {
  //       return post.id == postId;
  //     })[0]
  //   );

  //   getComments(postId);
  //   return () => {
  //     setPost();
  //     setComments();
  //   };
  // }, [postId]);
  // useEffect(() => {
  //   setPrevPost(posts[posts.indexOf(post) - 1]);
  //   setNextPost(posts[posts.indexOf(post) + 1]);

  //   return () => {
  //     setPrevPost();
  //     setNextPost();
  //   };
  // }, [post]);

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

  const deletePost = (postId) => {
    fetch(`${serverUrl}/posts/${postId}`, {
      method: "Delete",
      headers: {
        accept: "*/*",
      },
    }).catch((err) => console.error(err));
    navigate("/");
  };

  const goEdit = () => {
    navigate(`/edit/${postId}`);
  };

  // const onDelete = useConfirm("삭제하시겠습니까?", () => );
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

  // const renderPrev = () => {
  //   if (prevPost) {
  //     return (
  //       <div
  //         className="prev"
  //         onClick={() => {
  //           navigate(`/${prevPost.id}`);
  //         }}
  //       >
  //         <RiArrowLeftLine className="prevBtn" />
  //         <div>
  //           <p>이전 포스트</p>
  //           <h3>{prevPost.title}</h3>
  //         </div>
  //       </div>
  //     );
  //   }
  // };
  // const renderNext = () => {
  //   if (nextPost) {
  //     return (
  //       <div
  //         className="next"
  //         onClick={() => {
  //           navigate(`/${nextPost.id}`);
  //         }}
  //       >
  //         <div>
  //           <p>다음 포스트</p>
  //           <h3>{nextPost.title}</h3>
  //         </div>
  //         <RiArrowRightLine className="nextBtn" />
  //       </div>
  //     );
  //   }
  // };

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
      <Header />
      <div className="detail">
        <div className="head">
          <h1 className="title">{post?.title}</h1>
          <div className="tools">
            <span className="edit" onClick={goEdit}>
              수정
            </span>
            <span className="delete" onClick={onDelete}>
              삭제
            </span>
            {modal && (
              <Modal
                title={"포스트 삭제"}
                message={"정말로 삭제하시겠습니까?"}
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
            <h4>{comments?.length || "0"}개의 댓글 </h4>
            <textarea
              ref={inputCommentRef}
              onInput={(e) => onInput(e)}
              placeholder="댓글을 작성하세요"
            ></textarea>
            <div>
              <Button
                onClick={() => {
                  submitComment("create", inputComment);
                }}
              >
                댓글 작성
              </Button>
            </div>
          </div>
          <div className="commentsList">{renderComments()}</div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
