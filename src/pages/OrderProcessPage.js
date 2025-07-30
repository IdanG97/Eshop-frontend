import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Divider, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function OrderProcessPage() {
  const { orderId } = useParams();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [order, setOrder] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate('/login');
      return;
    }
    const arr = JSON.parse(localStorage.getItem('orders') || '[]');
    const o = arr.find(o => o.id === orderId && o.userEmail === user.email);
    setOrder(o);
  }, [orderId, user, navigate]);

  const handleRemove = (itemId) => {
    if (order.status !== "TEMP") return;
    const newItems = order.items.filter(i => i.id !== itemId);
    const newTotal = newItems.reduce((sum, i) => sum + i.price * i.count, 0);
    const updatedOrder = { ...order, items: newItems, total: newTotal };
    let arr = JSON.parse(localStorage.getItem('orders') || '[]');
    if (newItems.length === 0) {
      arr = arr.filter(o => o.id !== order.id);
      localStorage.setItem('orders', JSON.stringify(arr));
      navigate('/orders');
      return;
    }
    arr = arr.map(o => o.id === order.id ? updatedOrder : o);
    localStorage.setItem('orders', JSON.stringify(arr));
    setOrder(updatedOrder);
    setMsg('פריט הוסר מהסל');
    setTimeout(() => setMsg(''), 1500);
  };

  const handlePay = () => {
    let arr = JSON.parse(localStorage.getItem('orders') || '[]');
    arr = arr.map(o => o.id === order.id ? { ...o, status: "CLOSE", date: new Date().toLocaleString() } : o);
    localStorage.setItem('orders', JSON.stringify(arr));
    navigate('/orders');
  };

  if (!order) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Typography variant="h5" align="center" mb={2}>
        {order.status === "TEMP" ? "סל קניות (בהמתנה לתשלום)" : "פרטי הזמנה"}
      </Typography>
      {msg && <Alert severity="info" sx={{ mb: 2 }}>{msg}</Alert>}

      <Box>
        {order.items.map(item => (
          <Card key={item.id} sx={{ mb: 2, bgcolor: "#fafafa" }}>
            <CardContent>
              <Typography variant="body1">
                <b>{item.name}</b> | {item.price} ₪ | כמות: {item.count}
              </Typography>
              {order.status === "TEMP" && (
                <Button variant="outlined" color="error" onClick={() => handleRemove(item.id)} sx={{ mt: 1 }}>
                  הסר מהסל
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6"><b>סה"כ:</b> {order.total} ₪</Typography>
        <Typography><b>כתובת:</b> {order.address}</Typography>
        {order.status === "TEMP" && (
          <Button variant="contained" color="success" onClick={handlePay} sx={{ mt: 3, width: 220 }}>
            לתשלום וסגירת הזמנה
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default OrderProcessPage;

