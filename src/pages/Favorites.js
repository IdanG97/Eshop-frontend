import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid, Box } from '@mui/material';
import ItemCard from '../components/ItemCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (user && user.id) {
      setLoading(true);
      fetch(`http://localhost:8080/api/users/${user.id}/favorites`)
        .then(res => res.json())
        .then(data => {
          setFavorites(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.id]);

  if (!user) {
    return <PageBg>
      <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", mt: 6, fontSize: { xs: 16, sm: 22 } }}>יש להתחבר כדי לראות מועדפים</Paper>
    </PageBg>;
  }
  if (loading) {
    return <PageBg></PageBg>;
  }
  if (!favorites || favorites.length === 0) {
    return <PageBg>
      <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", mt: 6, fontSize: { xs: 16, sm: 22 } }}>אין לך פריטים במועדפים.</Paper>
    </PageBg>;
  }

  return (
    <PageBg>
      <Container sx={{ mt: { xs: 3, sm: 6 } }}>
        <Paper elevation={4} sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 6,
          background: "rgba(255,255,255,0.96)",
          boxShadow: "0 4px 24px #8fffd8c7"
        }}>
          <Typography variant="h4" gutterBottom align="center" fontWeight={900} color="#0abe6c"
            sx={{ letterSpacing: 1, fontSize: { xs: 23, sm: 28 } }}>
            המועדפים שלי
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            {favorites.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ItemCard item={item} onRemoveFavorite={handleRemoveFavorite} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </PageBg>
  );

  function handleRemoveFavorite(itemId) {
    setFavorites(favorites => favorites.filter(i => i.id !== itemId));
    fetch(`http://localhost:8080/api/users/${user.id}/favorites/${itemId}`, { method: 'DELETE' });
  }
}

function PageBg({ children }) {
  return (
    <Box sx={{
      minHeight: '100vh', py: 5, position: 'relative', background: 'linear-gradient(120deg, #232a28 0%, #25312d 90%)', overflow: "hidden"
    }}>
      <Box sx={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        zIndex: 0, background: `url('/images/backgraund.png') center/cover no-repeat`,
        opacity: 0.25, filter: "blur(1.5px) grayscale(25%)", pointerEvents: "none"
      }} />
      <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
    </Box>
  );
}

export default Favorites;
