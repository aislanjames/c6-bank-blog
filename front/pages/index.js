import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import PostGrid from '../components/PostsGrid';
import Post from '../components/Post';


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://wp-api.local/wp-json/wp/v2/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <Header />
      <Hero />
      <PostGrid posts={posts} />
    </Container>
  );
}