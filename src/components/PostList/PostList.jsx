import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./postList.module.css";
import { renderDateString } from "../common/commonFunctions";
import { Theme } from "../../theme/theme";

const PostList = ({ post }) => {
  const { thumbnail, id, title, body, createdAt } = post;
  const navigate = useNavigate();

  return (
    <Theme.ListCard
      className={styles.post}
      onClick={() => {
        navigate(`/${id}`);
      }}
    >
      {thumbnail && (
        <div className={styles.div}>
          <div className={styles.thumbnailContainer}>
            <img className={styles.thumbnail} src={thumbnail} alt="" />
          </div>
        </div>
      )}
      <div className={styles.contents}>
        <div>
          <Theme.ListTitle className={styles.title}>{title}</Theme.ListTitle>
          <Theme.ListBody className={styles.body}>{body}</Theme.ListBody>
        </div>
        <div className={styles.createdAt}>{createdAt && renderDateString(createdAt)}</div>
      </div>
    </Theme.ListCard>
  );
};

export default PostList;
