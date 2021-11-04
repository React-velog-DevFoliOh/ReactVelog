import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import ImageUploader from './service/image_uploader';
const imageUploader = new ImageUploader();

ReactDOM.render(
  <React.StrictMode>
    <App imageUploader={imageUploader} />
  </React.StrictMode>,
  document.getElementById("root")
);
