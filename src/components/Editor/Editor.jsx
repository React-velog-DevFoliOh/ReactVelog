import React, { useState, useEffect } from "react";
import styles from "./editor.module.css";
import { useParams, useNavigate } from "react-router-dom";
import ThumbnailInput from "../ThumbnailInput/ThumbnailInput";
import { Tag } from "../common/styledComponent";

const Editor = ({ updatePost, imageUploader, getPosts }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState();
  const [thumbnail, setThumbnail] = useState();

  const serverUrl = "https://limitless-sierra-67996.herokuapp.com/v1";

  const getPost = async (id) => {
    await fetch(`${serverUrl}/posts/${id}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((result) => setPost(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getPost(postId);
  }, [postId]);

  useEffect(() => {
    setTitle(post?.title);
    setTags(post?.tags);
    setBody(post?.body);
    setThumbnail(post?.thumbnail);
  },[post]);

  const goBack = () => {
    navigate("/");
  };
  const onClick = async(event) => {
    if (event.target == null) return;
    event.preventDefault();
    await updatePost({ id : postId, title, tags, body, thumbnail });
    goBack();
    getPosts();
  };
  const onChange = (event, setFn) => {
    if (event.target == null) return;
    event.preventDefault();
    setFn(event.target.value);
  };
  const onThumbnailChange = (thumbnail) => {
    setThumbnail(thumbnail.url);
  };
  const onKeyDown = (event) => {
    if (event.keyCode === 13 || event.keyCode === 188) {
      let tagArray = [...tags];
      if (event.target.value) {
        tagArray.push(event.target.value);
        let tagSet = new Set(tagArray);
        setTags([...tagSet]);
        event.preventDefault();
        event.target.value = "";
      }
    }
  };
  const renderTags = () => {
    return tags && tags.map((tag) => <Tag>{tag}</Tag>);
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <header className={styles.header}>
        <textarea
          placeholder="제목을 입력하세요"
          className={styles.title}
          onChange={(event) => onChange(event, setTitle)}
          defaultValue={title}
        />
        <div className={styles.divider}></div>
        <div className={styles.tags}>
          {renderTags()}
          <input
            className={styles.tag}
            placeholder="태그를 입력하세요"
            onKeyDown={(event) => onKeyDown(event)}
          />
        </div></header>

        <textarea
          className={styles.body}
          placeholder="당신의 이야기를 적어보세요..."
          onChange={(event) => onChange(event, setBody)}
          defaultValue={body}
        ></textarea>
      </section>
      <footer className={styles.footer}>
        <div className={styles.back} onClick={goBack}>
          <svg
            className={styles.arrow}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg>
          나가기
        </div>
        <div className={styles.buttons}>
          <ThumbnailInput
            thumbnail={thumbnail}
            imageUploader={imageUploader}
            onThumbnailChange={onThumbnailChange}
          />
          <button className={styles.temporary}>임시저장</button>
          <button className={styles.submit} onClick={onClick}>
            출간하기
          </button>
        </div>
      </footer>
    </div>
  );
}
  
export default Editor;