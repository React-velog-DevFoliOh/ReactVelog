import React from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../Header";
import PostList from "../post_list/post_list";
import styles from "./post_lists.module.css";
// import { BsSearch } from "react-icons/bs";

const PostLists = ({ posts }) => {
  // const navigate = useNavigate();
  // const onClick = () => {
  //   navigate("/post");
  // };
  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.posts}>
        {Object.keys(posts).map((key) => (
          <PostList key={key} post={posts[key]} />
        ))}
      </section>
    </div>
  );
};

export default PostLists;
