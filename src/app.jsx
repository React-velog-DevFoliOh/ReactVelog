import React, { useEffect, useState, useCallback } from "react";
import "./app.css";
import PostLists from "./components/PostLists/PostLists";
import CreatePost from "./components/CreatePost/CreatePost";
import Detail from "./components/Detail/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App({ imageUploader }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const submitPost = async (data) => {
    const response = await fetch(
      `https://limitless-sierra-67996.herokuapp.com/v1/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    setPosts({ ...posts, data });
    return await response.json();
  };

  useEffect(() => {
    fetch(
      `https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=10&sortBy=updatedAt:desc&page=${page}`
    )
      .then((response) => response.json())
      .then((result) => setPosts(prev => [...prev, ...result.results]))
      .catch((error) => console.log("error", error));
  }, [page]);

  useEffect(
    () =>
      fetch(
        `https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=10&sortBy=updatedAt:desc`
      )
        .then((response) => response.json())
        .then((result) => setPosts(result.results))
        .catch((error) => console.log("error", error)),
    []
  );
  const increasingPage = useCallback(() => {
    setPage((prev) => prev + 1);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<PostLists posts={posts} increasingPage={increasingPage} />}
        />
        <Route path="/:postId" element={<Detail posts={posts} />} />
        <Route
          path="/post"
          element={
            <CreatePost submitPost={submitPost} imageUploader={imageUploader} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
