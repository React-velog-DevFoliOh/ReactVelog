import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./postList.module.css";
import { renderDateString } from "../common/commonFunctions";

const PostList = ({ post }) => {
  const { thumbnail, id, title, body, createdAt } = post;
  const navigate = useNavigate();

  return (
    <li
      className={styles.post}
      onClick={() => {
        navigate(`/${id}`);
      }}
    >{thumbnail && (
      <div className={styles.div}>
          <div className={styles.thumbnailContainer}>
            <img className={styles.thumbnail} src={thumbnail} alt="" />
          </div>
        
      </div>
    )}
      <div className={styles.contents}>
        <div>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.body}>{body}</div>
        </div>
        <div className={styles.createdAt}>
          {createdAt && renderDateString(createdAt)}
        </div>
      </div>
    </li>
  );
};

export default PostList;
