import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PostGrid from '../components/PostsGrid';
import { API_URL } from '../pages/api/apiConfig';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [heroPost, setHeroPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();

        // Encontrar o post com a tag 'Hero'
        const heroPost = data.find(post => post.tags.includes('hero'));

        // Se houver um post com a tag 'Hero', remova-o da lista
        const filteredPosts = data.filter(post => post.id !== heroPost?.id).slice(0, 6);

        setPosts(filteredPosts);

        // Configurar o post 'Hero' no estado separado
        setHeroPost(heroPost);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <Header />
      <Hero heroPost={heroPost} />
      <PostGrid posts={posts} />
    </Container>
  );
}
