import React, { useState } from 'react';
import {
  AppBar, Toolbar, Button, Typography, Dialog, DialogActions, DialogTitle, Box,
  Drawer, IconButton, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('favs');
    localStorage.removeItem('orders');
    setOpen(false);
    navigate('/');
  };

  const navButtons = (
    <>
      <Button component={Link} to="/orders" sx={navBtnStyle}>הזמנות שלי</Button>
      <Button component={Link} to="/favorites" sx={navBtnStyle}>מועדפים</Button>
      <Button component={Link} to="/cart" sx={navBtnStyle}>סל קניות</Button>
      {!user ? (
        <Button component={Link} to="/login" sx={{ ...navBtnStyle, color: "#18e070", border: "1.5px solid #18e070", background: "none" }}>
          התחברות
        </Button>
      ) : (
        <>
          <Button onClick={handleLogout} sx={navBtnStyle}>התנתקות</Button>
          <Button color="error" onClick={() => setOpen(true)} sx={{ ...navBtnStyle, color: "#ff4444" }}>מחק חשבון</Button>
        </>
      )}
    </>
  );

  const drawerButtons = (
    <List sx={{ minWidth: 190 }}>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/orders" onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="הזמנות שלי" sx={{ textAlign: 'right' }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/favorites" onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="מועדפים" sx={{ textAlign: 'right' }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/cart" onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="סל קניות" sx={{ textAlign: 'right' }} />
        </ListItemButton>
      </ListItem>
      {!user ? (
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="התחברות" sx={{ textAlign: 'right', color: "#18e070" }} />
          </ListItemButton>
        </ListItem>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { setDrawerOpen(false); handleLogout(); }}>
              <ListItemText primary="התנתקות" sx={{ textAlign: 'right' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { setDrawerOpen(false); setOpen(true); }}>
              <ListItemText primary="מחק חשבון" sx={{ textAlign: 'right', color: "#ff4444" }} />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          mb: 5,
          background: "#151b19",
          color: "#fff",
          boxShadow: "0 6px 24px #16161655",
          direction: "rtl"
        }}
        elevation={5}
      >
        <Toolbar sx={{ minHeight: 76 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: "none" }}>
              <img
                src="/images/logo.png"
                alt="idan electric"
                style={{
                  width: 48, height: 48, marginLeft: 13,
                  filter: "drop-shadow(0 0 8px #60f5a0a5)"
                }}
              />
              <Typography variant="h5" sx={{
                fontWeight: 900, letterSpacing: 2,
                color: "#18e070",
                fontFamily: 'Varela Round, Arial'
              }}>
                idan electric
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navButtons}
          </Box>

          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, color: "#18e070" }}
            onClick={() => setDrawerOpen(true)}
            aria-label="menu"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: { direction: 'rtl', background: "#222b27" }
          }}
        >
          {drawerButtons}
        </Drawer>
      </AppBar>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18 }}>
          האם אתה בטוח שברצונך למחוק את החשבון? פעולה זו תמחק את כל הנתונים לצמיתות!
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" sx={{ fontWeight: 700 }}>ביטול</Button>
          <Button onClick={handleDeleteAccount} color="error" sx={{ fontWeight: 700 }}>מחק</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const navBtnStyle = {
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: 1,
  borderRadius: 4,
  px: 2.2,
  py: 1.1,
  color: "#fff",
  background: "rgba(38,226,111, 0.04)",
  boxShadow: "none",
  transition: "0.17s",
  "&:hover": {
    background: "#18e070",
    color: "#151b19",
    boxShadow: "0 2px 12px #26e6744d"
  }
};

export default Navbar;
