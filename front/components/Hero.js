import React, { useState, useEffect } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { API_URL } from '../pages/api/apiConfig';

const Hero = () => {
    const [heroPost, setHeroPost] = useState(null);
  
    useEffect(() => {
      const fetchHeroPost = async () => {
        try {
          // Obtenha todas as tags
          const tagsResponse = await fetch(`${API_URL}/tags`);
          const tags = await tagsResponse.json();
  
          // Encontre a tag "hero"
          const heroTag = tags.find(tag => tag.slug === 'hero');
  
          if (heroTag) {
            // Obtenha posts associados à tag "hero"
            const postsResponse = await fetch(`${API_URL}/posts?tags=${heroTag.id}`);
            const posts = await postsResponse.json();
  
            // Assumindo que há apenas um post com a tag "Hero"
            if (posts.length > 0) {
              const heroPostData = posts[0];
  
              // Fetch para obter a imagem destacada (featured image)
              const featuredImageResponse = await fetch(`${API_URL}/media/${heroPostData.featured_media}`);
              const featuredImageData = await featuredImageResponse.json();
  
              // Atualize o estado com todas as informações do post, incluindo a imagem
              setHeroPost({
                ...heroPostData,
                featured_image_url: featuredImageData.source_url,
              });
            }
          }
        } catch (error) {
          console.error('Erro ao buscar post Hero:', error);
        }
      };
  
      fetchHeroPost();
    }, []);
  
    return (
      <div>
        {heroPost && (
          <Grid container spacing={2}>
            {/* Lado Esquerdo - Títulos e Link */}
            <Grid item xs={6}>
              <div>
                <Typography variant="h3" component="h1">{heroPost.title.rendered}</Typography>
                <Typography variant="h6" component="h2">{heroPost.excerpt.rendered || 'Descrição não disponível'}</Typography>
                <Typography variant="body2">{new Date(heroPost.date).toLocaleDateString('pt-BR')}</Typography>
                <Link href={heroPost.link}>Continuar lendo</Link>
              </div>
            </Grid>
  
            {/* Lado Direito - Imagem */}
            <Grid item xs={6}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={heroPost.featured_image_url || 'URL_DA_IMAGEM_PADRAO'}
                  alt={heroPost.title.rendered}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
  
  export default Hero;
