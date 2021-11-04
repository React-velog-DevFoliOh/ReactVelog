import React, { useRef } from "react";
import styles from "./thumbnail_input.module.css";
import { IoImage } from "react-icons/io5";

const ThumbnailInput = ({ imageUploader, name, onThumbnailChange }) => {
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };
  const onChange = async (event) => {
    const uploaded = await imageUploader.upload(event.target.files[0]);
    onThumbnailChange({ name: uploaded.original_filename, url: uploaded.url });
    console.log(uploaded);
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
        <IoImage className={styles.thumbnailIcon} />
        {name || '썸네일 등록'}
      </button>
    </>
  );
};
export default ThumbnailInput;
