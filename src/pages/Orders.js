import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Divider } from '@mui/material';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`http://localhost:8080/api/orders/by-user/${user.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Server error');
        return res.text();
      })
      .then(text => text ? JSON.parse(text) : [])
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (!user) {
    return <PageBg>
      <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", mt: 6, fontSize: { xs: 16, sm: 22 } }}>צריך להתחבר כדי לראות הזמנות</Paper>
    </PageBg>;
  }
  if (loading) {
    return <PageBg></PageBg>;
  }
  if (!orders || orders.length === 0) {
    return <PageBg>
      <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", mt: 6, fontSize: { xs: 16, sm: 22 } }}>אין לך הזמנות.</Paper>
    </PageBg>;
  }

  return (
    <PageBg>
      <Container sx={{ mt: { xs: 3, sm: 6 } }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight={900} color="#0abe6c"
          sx={{ letterSpacing: 1, fontSize: { xs: 23, sm: 28 } }}>
          ההזמנות שלי
        </Typography>
        {orders.map(order => (
          <Paper key={order.id} sx={{
            borderRadius: 4, p: { xs: 1.5, sm: 3 }, mb: 3, boxShadow: "0 2px 20px #a2ffefc7",
            background: "rgba(255,255,255,0.97)", maxWidth: 740, margin: "auto"
          }}>
            <Box sx={{ mb: 1, color: "#33475b", fontSize: { xs: 15, sm: 17 } }}>
              <b>מזהה הזמנה:</b> {order.id}
            </Box>
            <Box sx={{ mb: 1, fontSize: { xs: 14, sm: 16 } }}>
              <b>תאריך:</b> {order.date?.substring(0, 10)}
            </Box>
            <Box sx={{ mb: 1, fontSize: { xs: 14, sm: 16 } }}>
              <b>סטטוס:</b> <span style={{ color: order.status === "OPEN" ? "#0abe6c" : "#0a82e6" }}>{order.status}</span>
            </Box>
            <Box sx={{ mb: 1, fontSize: { xs: 14, sm: 16 } }}>
              <b>כתובת:</b> {order.address}
            </Box>
            <Box sx={{ mb: 1, fontSize: { xs: 14, sm: 16 } }}>
              <b>סך הכל לתשלום:</b> <span style={{ color: "#0abe6c" }}>{order.total} ₪</span>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ fontSize: { xs: 14, sm: 15 } }}>
              <b>פריטים:</b>
              <ul style={{ paddingRight: 20 }}>
                {(order.items || []).map(ci =>
                  <li key={ci.id}>{ci.item?.name || "מוצר לא ידוע"} (כמות: {ci.quantity})</li>
                )}
              </ul>
            </Box>
          </Paper>
        ))}
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

export default Orders;
