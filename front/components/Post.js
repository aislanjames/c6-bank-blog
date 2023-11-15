import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { API_URL } from '../pages/api/apiConfig'

const Post = ({ post, hasCategories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  const fetchCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`);
      const data = await response.json();
      setCategoryName(data.name);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      setCategoryName('Sem categoria');
    }
  };

  const fetchFeaturedImage = async (mediaId) => {
    try {
      const response = await fetch(`${API_URL}/media/${mediaId}`);
      const data = await response.json();
      setFeaturedImage(data.source_url);
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
      setFeaturedImage('URL_DA_IMAGEM_PADRAO');
    }
  };

  useEffect(() => {
    if (post && post.categories && post.categories.length > 0 && hasCategories) {
      fetchCategory(post.categories[0]);
    } else {
      setCategoryName('Sem categoria');
    }

    if (post && post.featured_media) {
      fetchFeaturedImage(post.featured_media);
    } else {
      setFeaturedImage('URL_DA_IMAGEM_PADRAO');
    }
  }, [post, hasCategories]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <div key={post?.id || 'default-id'}>
      <div>
        <span>
          {categoryName}
        </span>
        {' | '}
        <span>
          {post && post.date ? formatDate(post.date) : 'Data não disponível'}
        </span>
      </div>
      <Card>
        <CardMedia
          component="img"
          width={140}
          image={featuredImage}
          title={post?.title?.rendered || 'Título não disponível'}
        />
        {post && post.title && post.title.rendered &&
          <Typography gutterBottom variant="h5" component="div">{post.title.rendered}</Typography>
        }
        <CardActions>
          <Button size="small" href={post && post.link ? post.link : '#'} target="_blank">Leia mais</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
