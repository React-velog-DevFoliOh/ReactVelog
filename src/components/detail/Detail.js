import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import "./detail.scss";

function Detail({ posts }) {
  const { postId } = useParams();
  const [post, setPost] = useState(
    posts.filter((post) => {
      return post.id == postId;
    })[0]
  );
  const [comments, setComments] = useState();

  useEffect(() => {
    getComments(postId);
    return () => {
      setPost();
      setComments();
    };
  }, []);
  const serverUrl = "https://limitless-sierra-67996.herokuapp.com/v1";
  // const getPosts = () => {
  //   const url = serverUrl + "/posts/" + postId;
  //   fetch(url, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setPost(result);
  //     })
  //     .catch((err) => alert(err));
  // };
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
      .catch((err) => alert(err));
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
        return <span className="tag">{tag}</span>;
      });
    }
  };

  const renderThumbnail = (thumbnail) => {
    if (thumbnail) {
      return <img src={thumbnail} alt="" />;
    }
  };

  const renderBody = (body) => {
    if (body) {
      return <p>{body}</p>;
    }
  };

  const renderPrev = (prev) => {
    if (prev) {
      return <div className="prev">이전 포스트</div>;
    }
  };
  const renderNext = (next) => {
    if (next) {
      return <div className="next"></div>;
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
          {renderThumbnail(post?.id)}
          {renderBody(post?.body)}
        </div>
        <div className="foot">
          <div className="prev_next">
            <div>{renderPrev()}</div>
            <div>{renderNext()}</div>
          </div>
          <div className="comments">
            <h4>{comments?.length}개의 댓글 </h4>
            <textarea placeholder="댓글을 작성하세요"></textarea>
            <div>
              <button>댓글 작성</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
