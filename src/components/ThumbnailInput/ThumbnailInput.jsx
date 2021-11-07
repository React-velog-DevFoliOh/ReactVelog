import React, { useRef, useState } from "react";
import styles from "./thumbnailInput.module.css";
import { IoImage } from "react-icons/io5";

const ThumbnailInput = ({ imageUploader, name, onThumbnailChange }) => {
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
    onThumbnailChange({ name: uploaded.original_filename, url: uploaded.url });
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
        {!loading && (name || '썸네일 등록')}
        {loading && <div className={styles.loading}/>}
      </button>
    </>
  );
};
export default ThumbnailInput;
