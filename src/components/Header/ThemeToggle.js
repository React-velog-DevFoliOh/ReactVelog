import React from "react";
import styled from "styled-components";

import { MdLightMode, MdDarkMode } from "react-icons/md";

function ThemeToggle({ toggle, mode }) {
  const Toggle = styled.div`
    position: relative;
    width: 3rem;
    height: 1.6rem;
    padding: 0 0.25rem;
    border-radius: 1rem;
    background-color: white;
    border: 1px solid rgb(52, 58, 64);
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    transition: 0.5s;

    ${(props) => {
      if (props.mode == "light") {
        return `& svg:first-child {
          opacity: 0;
        }
        & svg:last-child {
          opacity: 1;
        }`;
      } else {
        return `& svg:first-child {
          opacity: 1;
        }
        & svg:last-child {
          opacity: 0;
        }`;
      }
    }};
  `;
  const ToggleBtn = styled.span`
    position: absolute;
    display: block;
    width: 1rem;
    height: 1rem;
    transition: 0.5s;

    ${(props) => {
      if (props.mode == "light") {
        return "left: 0.25rem";
      } else {
        return "right: 0.25rem";
      }
    }};

    border-radius: 1rem;
    background-color: white;
    border: 1px solid rgb(52, 58, 64);
  `;

  return (
    <Toggle onClick={toggle} mode={mode}>
      <MdDarkMode />
      <ToggleBtn mode={mode} />
      <MdLightMode />
    </Toggle>
  );
}

export default ThemeToggle;
