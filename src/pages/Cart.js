import React, { useEffect, useState } from 'react';
import {
  Container, Paper, Typography, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  const fetchCart = () => {
    if (!user || !user.id) return;
    setLoading(true);
    fetch(`http://localhost:8080/api/users/${user.id}/cart`)
      .then(res => {
        if (!res.ok) throw new Error('Server error');
        return res.text();
      })
      .then(text => text ? JSON.parse(text) : [])
      .then(data => setCart(Array.isArray(data) ? data : []))
      .catch(() => setCart([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0);

  const handleRemove = async (itemId) => {
    if (!user) return;
    setLoading(true);
    await fetch(`http://localhost:8080/api/users/${user.id}/cart/${itemId}`, {
      method: 'DELETE'
    });
    fetchCart();
  };

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    const address = `${user.country}, ${user.city}`;
    const res = await fetch(`http://localhost:8080/api/orders/checkout/${user.id}?address=${encodeURIComponent(address)}`, {
      method: 'POST'
    });
    if (res.ok) {
      setMsg("!ההזמנה בוצעה בהצלחה");
      setCart([]);
      setTimeout(() => {
        navigate('/orders');
      }, 1200);
    } else {
      const errorText = await res.text();
      setMsg("שגיאה בביצוע ההזמנה" + (errorText ? ": " + errorText : ""));
    }
    setLoading(false);
  };

  if (!user) {
    return <PageBg>
      <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", mt: 6, fontSize: { xs: 16, sm: 22 } }}>צריך להתחבר כדי לראות עגלה</Paper>
    </PageBg>;
  }
  if (loading) {
    return <PageBg></PageBg>;
  }
  if (!cart || cart.length === 0) {
    return <PageBg>
      <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", mt: 6, fontSize: { xs: 16, sm: 22 } }}>העגלה שלך ריקה.</Paper>
    </PageBg>;
  }

  return (
    <PageBg>
      <Container sx={{ mt: { xs: 3, sm: 6 } }}>
        <Paper elevation={4} sx={{
          p: { xs: 2, sm: 4 }, borderRadius: 6, maxWidth: 760, margin: "auto",
          background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 24px #7be0a4b0"
        }}>
          <Typography variant="h4" gutterBottom align="center" fontWeight={900} color="#0abe6c" sx={{ letterSpacing: 1, fontSize: { xs: 23, sm: 28 } }}>
            העגלה שלי
          </Typography>
          <TableContainer sx={{
            borderRadius: 4,
            overflowX: "auto",
            maxWidth: "100%"
          }}>
            <Table sx={{ minWidth: 530 }}>
              <TableHead>
                <TableRow sx={{ background: "#d3ffec" }}>
                  <TableCell>פריט</TableCell>
                  <TableCell>כמות</TableCell>
                  <TableCell>מחיר ליחידה</TableCell>
                  <TableCell>סה"כ</TableCell>
                  <TableCell align="center">הסר</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(ci => (
                  <TableRow key={ci.id} sx={{ background: "#fff" }}>
                    <TableCell>{ci.item.name}</TableCell>
                    <TableCell>{ci.quantity}</TableCell>
                    <TableCell>{ci.item.price} ₪</TableCell>
                    <TableCell>{ci.item.price * ci.quantity} ₪</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleRemove(ci.item.id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{
            textAlign: { xs: "center", sm: "left" },
            mt: 3,
            fontSize: { xs: 18, sm: 22 },
            fontWeight: 700,
            color: "#197e4c"
          }}>
            סה"כ לתשלום: <span style={{ color: "#0abe6c" }}>{total} ₪</span>
          </Box>
          <Button
            variant="contained"
            color="success"
            sx={{
              mt: 3, width: "100%", py: 1.3, fontWeight: 700,
              fontSize: { xs: 17, sm: 20 },
              borderRadius: 6, boxShadow: "0 4px 18px #d2fbe2"
            }}
            onClick={handleCheckout}
          >
            בצע הזמנה
          </Button>
          {msg && <div style={{
            color: msg.includes('שגיאה') ? '#ba1919' : '#0abe6c',
            marginTop: 18, fontWeight: 700, fontSize: 18
          }}>{msg}</div>}
        </Paper>
      </Container>
    </PageBg>
  );
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

export default Cart;
