import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('error');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (!form.email || !form.password) {
      setMsg('נא למלא אימייל וסיסמה');
      setMsgType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:
        JSON.stringify(form)
      });

      let user = null;
      let raw = await res.text();
      try { user = JSON.parse(raw); } catch { }

      if (res.ok && user && user.id) {
        setMsg('ברוך הבא, ' + user.firstName + '!');
        setMsgType('success');
        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => {
          navigate('/');
        }, 900);
      } else {
        setMsg(raw && raw.includes('אימייל') ? raw : 'אימייל או סיסמה לא נכונים');
        setMsgType('error');
      }
    } catch {
      setMsg('שגיאת תקשורת לשרת.');
      setMsgType('error');
    }
  };

  return (
    <PageBg>
      <Box sx={{
        minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Card sx={{
          maxWidth: 400, width: '100%', borderRadius: 5, boxShadow: "0 2px 24px #7be0a4b0",
          background: "rgba(255,255,255,0.96)",
          mx: { xs: 1, sm: 0 }
        }}>
          <CardContent>
            <Typography variant="h5" align="center" fontWeight={900} gutterBottom color="#0abe6c" sx={{ fontSize: { xs: 21, sm: 24 } }}>
              התחברות
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField
                label="אימייל"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="סיסמה"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Button fullWidth type="submit" variant="contained" color="success" sx={{
                mt: 2, borderRadius: 3, fontWeight: 700, py: 1.2,
                fontSize: { xs: 16, sm: 18 }, boxShadow: "0 2px 8px #a7ffe6"
              }}>
                התחבר
              </Button>
            </Box>
            {msg && (
              <Alert severity={msgType} sx={{ mt: 2 }}>
                {msg}
              </Alert>
            )}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              אין לך חשבון?
              <Button
                variant="outlined"
                color="success"
                component={Link}
                to="/register"
                sx={{ ml: 1, fontWeight: 700, borderRadius: 3 }}
              >
                להרשמה
              </Button>
            </Box>
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

export default Login;
