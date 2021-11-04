import React, {useCallback, useEffect, useState} from 'react';
import "./app.css";
import styled from "styled-components";
import * as color from "./common/color";
import PostLists from './components/post_lists';

function App() {
  const [posts, setPosts] = useState([]);
  
  useEffect(()=>fetch(
    `https://limitless-sierra-67996.herokuapp.com/v1/posts`
  )
  .then((response) => response.json())
  .then((result) => setPosts(result.results))
  .catch((error) => console.log("error", error)));


  return <PostLists posts={posts}/>;
}

export default App;
