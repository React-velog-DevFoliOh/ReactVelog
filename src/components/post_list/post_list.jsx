import React from "react";
import styles from "./post_list.module.css";

const PostList = ({ post }) => {
  return (
    <li className={styles.post}>
        <img className={styles.thumbnail}
          src={post.thumbnail || "https://cdn.imweb.me/thumbnail/20201107/2ecf0c7c29449.jpg"}
          alt=""
        />
      <div className={styles.contents}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.body}>{post.body}</div>
        <div className={styles.createdAt}>{post.createdAt}</div>
      </div>
    </li>
  );
};

export default PostList;
