import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';
import Post from '../components/Post';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Lista de Posts</h1>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Blog;
