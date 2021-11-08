import React, { useEffect, useState, useCallback } from "react";
import "./app.css";
import PostLists from "./components/PostLists/PostLists";
import CreatePost from "./components/CreatePost/CreatePost";
import Detail from "./components/Detail/Detail";
import Editor from "./components/Editor/Editor";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
function App({ imageUploader }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [theme, setTheme] = useState("bright");
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
  const updatePost = async (data) => {
    const response = await fetch(
      `https://limitless-sierra-67996.herokuapp.com/v1/posts/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  };

  useEffect(() => getPosts, []);

  useEffect(() => {
    if (page == 1) return;
    fetch(
      `https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=10&sortBy=updatedAt:desc&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setPosts((prev) => [...prev, ...result.results]))
      .catch((error) => console.log("error", error));
  }, [page]);

  const getPosts = async () => {
    await fetch(
      `https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=10&sortBy=updatedAt:desc`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setPosts(result.results))
      .catch((error) => console.log("error", error));
    setPage(1);
  };

  const increasingPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PostLists posts={posts} increasingPage={increasingPage} getPosts={getPosts} />
            }
          />
          <Route path="/:postId" element={<Detail posts={posts} getPosts={getPosts} />} />
          <Route
            path="/post"
            element={
              <CreatePost
                submitPost={submitPost}
                imageUploader={imageUploader}
                getPosts={getPosts}
              />
            }
          />
          <Route
            path="/edit/:postId"
            element={
              <Editor updatePost={updatePost} imageUploader={imageUploader} getPosts={getPosts} />
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
