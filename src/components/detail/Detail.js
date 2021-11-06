import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../Header";
import { Tag, Button } from "../common/styledComponent";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import "./detail.scss";

function Detail({ posts }) {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [inputComment, setInputComment] = useState();
  const [prevPost, setPrevPost] = useState();
  const [nextPost, setNextPost] = useState();

  useEffect(() => {
    setPost(
      posts.filter((post) => {
        return post.id == postId;
      })[0]
    );

    getComments(postId);
    return () => {
      setPost();
      setComments();
    };
  }, [postId]);
  useEffect(() => {
    setPrevPost(posts[posts.indexOf(post) - 1]);
    setNextPost(posts[posts.indexOf(post) + 1]);

    return () => {
      setPrevPost();
      setNextPost();
    };
  }, [post]);
  const serverUrl = "https://limitless-sierra-67996.herokuapp.com/v1";
  const getComments = (postId = "") => {
    fetch(serverUrl + "/comments", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((results) => {
        if (postId) {
          setComments(
            results.results.filter((comment) => {
              return comment.postId == postId;
            })
          );
        } else {
          return results.results;
        }
      })
      .catch((err) => console.error(err));
  };

  const renderDateString = (updatedAt) => {
    if (updatedAt) {
      let date = new Date(updatedAt);

      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
  };

  const renderTags = (tags) => {
    if (tags) {
      return tags.map((tag) => {
        return <Tag>{tag}</Tag>;
      });
    }
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

  const renderPrev = () => {
    if (prevPost) {
      return (
        <div
          className="prev"
          onClick={() => {
            navigate(`/${prevPost.id}`);
          }}
        >
          <RiArrowLeftLine className="prevBtn" />
          <div>
            <p>이전 포스트</p>
            <h3>{prevPost.title}</h3>
          </div>
        </div>
      );
    }
  };
  const renderNext = () => {
    if (nextPost) {
      return (
        <div
          className="next"
          onClick={() => {
            navigate(`/${nextPost.id}`);
          }}
        >
          <div>
            <p>다음 포스트</p>
            <h3>{nextPost.title}</h3>
          </div>
          <RiArrowRightLine className="nextBtn" />
        </div>
      );
    }
  };

  const onInput = (e) => {
    setInputComment(e.target.value);
  };
  const submitComment = () => {
    const data = {
      postId: post?.id,
      body: inputComment,
    };
    console.log(data);
    fetch(serverUrl + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(getComments(post?.id));
  };

  const renderComments = () => {
    if (comments) {
      return comments.map((comment) => {
        return <p>{comment.body}</p>;
      });
    }
  };

  return (
    <>
      <Header />
      <div className="detail">
        <div className="head">
          <h1 className="title">{post?.title}</h1>
          <span className="time">{renderDateString(post?.updatedAt)}</span>
          <div className="tags">{renderTags(post?.tags)}</div>
        </div>
        <div className="body">
          {renderThumbnail(post?.thumbnail)}
          {renderBody(post?.body)}
        </div>
        <div className="foot">
          <div className="prev_next">
            <div>{renderPrev()}</div>
            <div>{renderNext()}</div>
          </div>
          <div className="comments">
            <h4>{comments?.length || "0"}개의 댓글 </h4>
            <textarea onInput={(e) => onInput(e)} placeholder="댓글을 작성하세요"></textarea>
            <div>
              <Button onClick={submitComment}>댓글 작성</Button>
            </div>
          </div>
          <div className="commentsList">{renderComments()}</div>
        </div>
      </div>
    </>
  );
}

export default Detail;
