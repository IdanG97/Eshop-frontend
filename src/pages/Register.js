import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    password: ''
  });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');

  const navigate = useNavigate();

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      password.length <= 20 &&
      /[A-Za-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (!form.password || !validatePassword(form.password)) {
      setMsg("הסיסמה חייבת להיות בין 8 ל-20 תווים, ולכלול אותיות ומספרים");
      setMsgType("error");
      return;
    }
    const res = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      setMsg('נרשמת בהצלחה! מפנה לעמוד הבית...');
      setMsgType('success');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      const error = await res.text();
      setMsg(error && error.length < 200 ? error : 'שגיאה בהרשמה. נסה שוב.');
      setMsgType('error');
    }
  };

  return (
    <PageBg>
      <Box sx={{
        minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <Card sx={{
          maxWidth: 440, width: '100%', borderRadius: 5, boxShadow: "0 2px 24px #7be0a4b0",
          background: "rgba(255,255,255,0.96)",
          mx: { xs: 1, sm: 0 }
        }}>
          <CardContent>
            <Typography variant="h5" align="center" fontWeight={900} gutterBottom color="#0abe6c" sx={{ fontSize: { xs: 20, sm: 24 } }}>
              הרשמה ל־idan electric
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField label="שם פרטי" name="firstName" value={form.firstName} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="שם משפחה" name="lastName" value={form.lastName} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="טלפון" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="מדינה" name="country" value={form.country} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="עיר" name="city" value={form.city} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="סיסמה" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
              <Button fullWidth type="submit" variant="contained" color="success" sx={{
                mt: 2, fontWeight: 700, fontSize: { xs: 16, sm: 18 }, borderRadius: 3, py: 1.2, boxShadow: "0 2px 10px #c1ffef"
              }}>
                הרשמה
              </Button>
            </Box>
            {msg && (
              <Alert severity={msgType} sx={{ mt: 2 }}>
                {msg}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
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

export default Register;
