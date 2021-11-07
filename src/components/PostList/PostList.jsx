import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./postList.module.css";
import { renderDateString } from '../common/commonFunctions';

const PostList = ({ post }) => {
  const {thumbnail, id, title, body, createdAt} =post;
  const navigate = useNavigate();

  return (
    <li
      className={styles.post}
      onClick={() => {
        navigate(`/${id}`);
      }}
    >
      <img
        className={styles.thumbnail}
        src={thumbnail || "https://cdn.imweb.me/thumbnail/20201107/2ecf0c7c29449.jpg"}
        alt=""
      />
      <div className={styles.contents}>
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>{body}</div>
        <div className={styles.createdAt}>{createdAt && renderDateString(createdAt)}</div>
      </div>
    </li>
  );
};

export default PostList;
