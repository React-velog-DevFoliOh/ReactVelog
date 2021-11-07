import styled from "styled-components";

export const Tag = styled.span`
  font-size: 1rem;
  padding: 0 1rem;
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  color: rgb(12, 166, 120);
  background-color: rgb(241, 243, 245);
  cursor: pointer;
`;

export const Button = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: rgb(18, 184, 134);
  color: white;
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
  &:hover {
    opacity: 0.8;
  }
  &.cancel {
    background: rgb(134, 142, 150);
  }
  & + button {
    margin-left: 0.5rem;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  & > div {
    width: 25 rem;
    border-radius: 4px;
    background: white;
    padding: 2rem 1.5rem;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    h3 {
      margin: 0px;
      font-size: 1.5rem;
      color: rgb(52, 58, 64);
      line-height: 1.5;
      font-weight: bold;
    }
    p {
      line-height: 1.5;
      font-size: 1rem;
      color: rgb(73, 80, 87);
      margin-top: 1rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
    }
    div {
      margin-top: 2 rem;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
    }
  }
`;
