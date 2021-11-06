import React, {useRef, useCallback, useEffect} from "react";
import Header from "../Header";
import PostList from "../post_list/post_list";
import styles from "./post_lists.module.css";

const PostLists = ({ posts, increasingPage }) => {
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
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);


  return (
    <div className={styles.container}>
      <Header />
        <section className={styles.posts}>
          {Object.keys(posts).map((key) => (
            <PostList key={key} post={posts[key]} />
          ))}
          <div ref={loader} />
      </section>
    </div>
  );
};

export default PostLists;
