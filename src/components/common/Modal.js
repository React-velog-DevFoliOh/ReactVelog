import React from "react";
import reactDom from "react-dom";
import { Button, ModalWrapper } from "./styledComponent";

function Modal({ title, message, onConfirm, onCancel }) {
  const modalElement = document.getElementById("modal");
  return reactDom.createPortal(
    <ModalWrapper>
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div>
          <Button className="cancel" onClick={onCancel}>
            취소
          </Button>
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </div>
    </ModalWrapper>,
    modalElement
  );
}

export default Modal;
