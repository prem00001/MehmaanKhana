import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { apiPost } from '../utils/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await apiPost('/auth/login', { email, password });
      if (res?.token && res?.user) {
        if (res.user?.email !== 'premprakashmotwani@gmail.com' || res.user?.id == null) {
          // still allow any admin role
          // require role check by fetching profile next if needed
        }
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user_info', JSON.stringify(res.user));
        navigate('/admin');
      } else {
        setError('Invalid response');
      }
    } catch (e) {
      try {
        const parsed = JSON.parse(e.message);
        setError(parsed?.message || 'Login failed');
      } catch (_) {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4', p: 2 }}>
      <Container maxWidth="xs" sx={{ backgroundColor: 'white', borderRadius: 2, p: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">Admin Login</Typography>
        <TextField label="Email" type="email" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && (
          <Typography variant="body2" color="error" mb={2} textAlign="center">{error}</Typography>
        )}
        <Button fullWidth variant="contained" color="warning" disabled={loading} onClick={handleLogin}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <Typography variant="caption" display="block" mt={2} textAlign="center">Use your admin credentials</Typography>
      </Container>
    </Box>
  );
}


