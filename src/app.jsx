import React, { useEffect, useState } from "react";
import "./app.css";
import PostLists from "./components/post_lists";
import CreatePost from "./components/create_post/create_post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App({imageUploader}) {
  const [posts, setPosts] = useState([]);

  const submitPost = async (data) => {
    const response = await fetch(`https://limitless-sierra-67996.herokuapp.com/v1/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  useEffect(() =>
    fetch(`https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=30`)
      .then((response) => response.json())
      .then((result) => setPosts(result.results))
      .catch((error) => console.log("error", error))
  ,[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostLists posts={posts} />} />
        <Route path="/post" element={<CreatePost submitPost={submitPost} imageUploader={imageUploader}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
