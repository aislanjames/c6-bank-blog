import React from 'react';
import { Typography, Grid } from '@mui/material';
import Post from './Post';

const PostGrid = ({ posts }) => {
  return (
    <section>
      <Typography variant="h4" component="h3">
        Destaques
      </Typography>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Post post={post} hasCategories={true} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default PostGrid;
