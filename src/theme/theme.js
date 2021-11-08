import styled from "styled-components";
export const lightTheme = {
  backgroundColor: "#F8F9FA",
  textColor: "#333",
  borderColor: "#eaeaea",
  navBarBackgroundColor: "#fff",
  listBackgroundColor: "#fff",
  listTitleColor: "color: rgb(33, 37, 41)",
  listBodyColor: "rgb(73, 80, 87)",
};
export const darkTheme = {
  backgroundColor: "#1e1f21",
  textColor: "#ccc",
  borderColor: "#2c2d33",
  navBarBackgroundColor: "#292a2d",
  boxBackgroundColor: "#292a2d",
  listTitleColor: "#ddd",
  listBodyColor: "#aaa",
};
export const theme = {
  brightTheme: lightTheme,
  darkTheme,
};

export const Theme = {
  Container: styled.div`
    background-color: ${(props) => props.theme.backgroundColor} !important;
    color: ${(props) => props.theme.textColor} !important;
  `,
  NavBar: styled.div`
    background-color: ${(props) => props.theme.navBarBackgroundColor} !important;
    color: ${(props) => props.theme.textColor} !important;
  `,
  ListCard: styled.div`
    background-color: ${(props) => props.theme.boxBackgroundColor} !important;
    color: ${(props) => props.theme.textColor} !important;
  `,
  ListTitle: styled.h4`
    color: ${(props) => props.theme.listTitleColor} !important;
  `,
  ListBody: styled.h4`
    color: ${(props) => props.theme.listBodyColor} !important;
  `,
  TextArea: styled.textarea`
    background-color: ${(props) => props.theme.boxBackgroundColor} !important;
    color: ${(props) => props.theme.textColor} !important;
  `,
};
