import React, { useState } from "react";
import { renderDateString } from "../common/commonFunctions";
import { useConfirm } from "../common/useConfirm";
import { Button } from "../common/styledComponent";
import Modal from "../common/Modal";

function Comment({ comment, submitComment }) {
  const [mode, setMode] = useState("init");
  const [modal, setModal] = useState(false);
  const [inputComment, setInputComment] = useState();
  const updateComment = () => {
    setMode("update");
  };
  const onInput = (e) => {
    setInputComment(e.target.value);
  };
  // const deleteComment = useConfirm("삭제하시겠습니까?", () =>
  //   submitComment("delete", null, comment.id)
  // );
  const deleteComment = () => {
    setModal(true);
  };

  const renderCommentBody = () => {
    switch (mode) {
      case "init":
        return <p>{comment.body}</p>;

      case "update":
        return (
          <div className="comments">
            <textarea onInput={(e) => onInput(e)} placeholder="댓글을 작성하세요">
              {comment.body}
            </textarea>
            <div>
              <Button
                className="cancel"
                onClick={() => {
                  setMode("init");
                }}
              >
                취소
              </Button>
              <Button
                onClick={async () => {
                  await submitComment("update", inputComment, comment.id);
                  setMode("init");
                }}
              >
                댓글 수정
              </Button>
            </div>
          </div>
        );

      default:
        console.log("Comment Component has Error");
    }
  };
  const renderButtons = () => {
    switch (mode) {
      case "init":
        return (
          <div>
            <span className="button" onClick={updateComment}>
              수정
            </span>
            <span
              className="button"
              onClick={() => {
                deleteComment();
              }}
            >
              삭제
            </span>
            {modal && (
              <Modal
                title={"댓글 삭제"}
                message={"댓글을 정말로 삭제하시겠습니까?"}
                onConfirm={() => {
                  submitComment("delete", null, comment.id);
                }}
                onCancel={() => {
                  setModal(false);
                }}
              />
            )}
          </div>
        );
      case "update":
        break;
      default:
        console.log("Comment Component has Error");
    }
  };

  return (
    <li>
      <div className="commentHead">
        <span>{renderDateString(comment.updatedAt)}</span>
        {renderButtons()}
      </div>
      {renderCommentBody()}
    </li>
  );
}

export default Comment;
