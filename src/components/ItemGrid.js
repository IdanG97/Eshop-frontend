import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from './ItemCard';

function ItemGrid({ items, onAddToCart, onAddFavorite }) {
  if (!items || items.length === 0) return null;

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="stretch" direction="row-reverse">
      {items.map(item => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <ItemCard
            item={item}
            onAddToCart={onAddToCart}
            onAddFavorite={onAddFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemGrid;
