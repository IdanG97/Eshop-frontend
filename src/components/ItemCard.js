import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, IconButton, Box, Button, Tooltip, Stack
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ItemCard({ item, onAddToCart, onAddFavorite, onRemoveFavorite }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [isFav, setIsFav] = useState(false);

  const handleFav = async () => {
    if (!user || !user.id) {
      alert('צריך להתחבר');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/users/${user.id}/favorites/${item.id}`, {
        method: 'POST'
      });
      if (res.ok) {
        setIsFav(true);
        alert('נוסף למועדפים!');
      } else {
        alert('שגיאה בהוספה למועדפים');
      }
    } catch (err) {
      alert('שגיאה בבקשה למועדפים');
    }
  };

  const handleAddToCart = async () => {
    if (!user || !user.id) {
      alert('צריך להתחבר');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/users/${user.id}/cart/${item.id}?quantity=1`, {
        method: 'POST'
      });
      if (res.ok) {
        alert('נוסף לעגלה!');
      } else {
        const txt = await res.text();
        alert('שגיאה בהוספה לעגלה: ' + txt);
      }
    } catch (err) {
      alert('שגיאה בחיבור לעגלה');
    }
  };

  return (
    <Card sx={{
      height: { xs: 340, sm: 370, md: 430 },
      display: "flex",
      flexDirection: "column",
      borderRadius: 5,
      boxShadow: "0 4px 20px #c5efc4ff",
      mb: 2,
      transition: ".22s",
      background: "linear-gradient(140deg, #f9fbfc 60%, #e0f7fa 100%)",
      ":hover": { boxShadow: "0 8px 40px #8df2ffff", transform: "translateY(-7px) scale(1.035)" }
    }}>
      <CardMedia
        component="img"
        image={item.img}
        alt={item.name}
        sx={{
          height: { xs: 110, sm: 140, md: 155 },
          width: "100%",
          objectFit: "contain",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          background: "#e1faeaff",
          display: "block"
        }}
      />
      <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2.5, md: 3 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#1565c0",
            fontSize: { xs: 17, sm: 18, md: 20 }
          }}>
          {item.name}
        </Typography>
        <Typography
          variant="body1"
          color="#2e536b"
          sx={{
            fontWeight: 600,
            fontSize: { xs: 14, sm: 15 }
          }}>
          {item.price} ₪
        </Typography>
        <Typography
          variant="body2"
          color={item.stock === 0 ? "error" : "#388e3c"}
          fontWeight={500}
          sx={{ fontSize: { xs: 13, sm: 14 } }}
        >
          {item.stock === 0 ? "אזל מהמלאי" : `במלאי: ${item.stock}`}
        </Typography>

        {user && !onRemoveFavorite && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: { xs: 1, sm: 2 },
              mb: { xs: 0.5, sm: 1 }
            }}>
            <Tooltip title="הוסף למועדפים">
              <IconButton onClick={handleFav} color={isFav ? "error" : "primary"} size="large">
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="הוסף לסל">
              <IconButton onClick={handleAddToCart} color="success" size="large" disabled={item.stock === 0}>
                <AddShoppingCartIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        {onRemoveFavorite && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              mt: { xs: 1.2, sm: 2 },
              borderRadius: 2,
              fontWeight: 700,
              fontSize: { xs: 14, sm: 16 }
            }}
            onClick={() => onRemoveFavorite(item.id)}
          >
            הסר מהמועדפים
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default ItemCard;
