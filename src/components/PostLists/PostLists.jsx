import React, { useRef, useCallback, useEffect } from "react";
import Header from "../Header/Header";
import PostList from "../PostList/PostList";
import styles from "./postLists.module.css";

const PostLists = ({ posts, increasingPage, getPosts }) => {
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      increasingPage();
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className={styles.container}>
      <Header getPosts={getPosts}/>
      <section className={styles.postsContainer}>
      <div className={styles.posts}>
        {posts && Object.keys(posts).map((key) => (
          <PostList key={key} post={posts[key]} />
        ))}
      </div>
        <div ref={loader}/>
      </section>
    </div>
  );
};

export default PostLists;
