import React, { useRef, useState } from "react";
import styles from "./thumbnailInput.module.css";
import { IoImage } from "react-icons/io5";

const ThumbnailInput = ({ imageUploader, thumbnail, onThumbnailChange }) => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };
  const onChange = async (event) => {
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);
    onThumbnailChange(uploaded);
  };

  return (
    <>
      <input
        ref={inputRef}
        id="profile_pic"
        type="file"
        accept="image/*"
        className={styles.input}
        onChange={onChange}
      />
      <button className={styles.thumbnail} onClick={onButtonClick}>
        {!loading && <IoImage className={styles.thumbnailIcon} />}
        {!loading && (thumbnail ? '썸네일 등록 완료' : '썸네일 등록')}
        {loading && <div className={styles.loading}/>}
      </button>
    </>
  );
};
export default ThumbnailInput;
