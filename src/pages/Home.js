import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper, Box, Divider } from '@mui/material';
import SearchBar from '../components/SearchBar';
import ItemGrid from '../components/ItemGrid';

function Home() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch("http://localhost:8080/api/items")
      .then(res => res.json())
      .then(data => {
        setAllItems(data);
        setItems(data);
      });
  }, []);

  const handleSearch = (search) => {
    setQuery(search);
    if (!search || search.trim() === "") {
      setItems(allItems);
    } else {
      setItems(allItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          background: `url('/images/backgraund.png') center/cover no-repeat`,
          opacity: 0.30,
          filter: "blur(1.5px) grayscale(25%)",
          pointerEvents: "none"
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, px: { xs: 0.5, sm: 2 } }}>
        <Paper elevation={6} sx={{
          p: { xs: 2, sm: 3, md: 5 },
          borderRadius: 6,
          mb: { xs: 2, sm: 4 },
          mt: { xs: 2, sm: 3, md: 7 },
          background: "rgba(255, 255, 255, 0.98)",
          boxShadow: "0 4px 24px #60e8b933",
          minHeight: { xs: 0, md: 650 },
          maxWidth: { xs: '100%', sm: 700, md: 950 },
          margin: "0 auto"
        }}>
          <Typography variant="h2" align="center" gutterBottom sx={{
            fontWeight: 900,
            color: "#0cc06fff",
            fontFamily: "Varela Round, Arial",
            textShadow: "0 3px 8px #97ffde55",
            fontSize: { xs: 32, sm: 38, md: 48 }
          }}>
            idan electric <span role="img" aria-label="bolt">⚡</span>
          </Typography>
          <Typography align="center" sx={{
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: 16, sm: 20, md: 22 },
            color: "#13b267",
            fontWeight: 400,
            letterSpacing: 1
          }}>
            ברוכים הבאים לחנות המובילה למוצרי חשמל ואלקטרוניקה
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 2, sm: 3 } }}>
            <img
              src="/images/logo.png"
              alt="idan electric logo"
              style={{
                width: '100%',
                maxWidth: 110,
                minWidth: 80,
                height: 'auto',
                borderRadius: 24,
                boxShadow: "0 6px 24px #6affb6",
                marginBottom: 16,
                background: "#f2fef9",
                border: "4px solid #61e681"
              }}
            />
          </Box>
          <Divider sx={{ mb: { xs: 2, sm: 3 }, bgcolor: "#27c674" }} />
          <SearchBar items={allItems} onSearch={handleSearch} />
          {items.length === 0 ? (
            <Typography variant="h6" align="center" color="error" mt={4} sx={{ fontSize: { xs: 16, sm: 20 } }}>
              לא נמצאו פריטים בשם "{query}"
            </Typography>
          ) : (
            <ItemGrid items={items} />
          )}
        </Paper>
        <Paper elevation={3} sx={{
          mt: { xs: 4, sm: 8 },
          p: { xs: 1.5, sm: 3 },
          borderRadius: 5,
          textAlign: "center",
          background: "#d7fff1",
          color: "#06b853"
        }}>
          <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: 1, fontSize: { xs: 16, sm: 20 } }}>
            idan electric
          </Typography>
          <Typography sx={{ mt: 1, fontSize: { xs: 13, sm: 17 } }}>
            מייל: <a href="mailto:idanbalef@gmail.com" style={{ color: "#058a49" }}>idanbalef@gmail.com</a>
            <br />
            טלפון: <a href="tel:052-2892457" style={{ color: "#058a49" }}>052-2892457</a>
          </Typography>
          <Typography sx={{ mt: 2, opacity: .7, fontSize: { xs: 11, sm: 14 } }}>
            &copy; {new Date().getFullYear()} idan electric כל הזכויות שמורות
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
