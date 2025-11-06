import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { apiGet } from '../utils/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    (async () => {
      try {
        const dash = await apiGet('/admin/dashboard');
        setStats(dash.stats);
        setBookings(dash.recentBookings || []);
        const usersRes = await apiGet('/admin/users?limit=8');
        setUsers(usersRes.users || []);
      } catch (e) {
        setError('Unauthorized or server error');
        navigate('/admin/login');
      }
    })();
  }, [navigate]);

  return (
    <Box sx={{ minHeight: '100vh', background: '#f6f7fb', p: 3 }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">Admin Dashboard</Typography>
          <Box>
            <Button sx={{ mr: 1 }} variant="outlined" onClick={() => navigate('/')}>Go to Site</Button>
            <Button color="error" variant="contained" onClick={() => { localStorage.removeItem('auth_token'); localStorage.removeItem('user_info'); navigate('/admin/login'); }}>Logout</Button>
          </Box>
        </Box>

        {error && (
          <Typography color="error" mb={2}>{error}</Typography>
        )}

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent>
              <Typography variant="body2" color="text.secondary">Users</Typography>
              <Typography variant="h5" fontWeight="bold">{stats?.totalUsers ?? '-'}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent>
              <Typography variant="body2" color="text.secondary">Hotels</Typography>
              <Typography variant="h5" fontWeight="bold">{stats?.totalHotels ?? '-'}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent>
              <Typography variant="body2" color="text.secondary">Rooms</Typography>
              <Typography variant="h5" fontWeight="bold">{stats?.totalRooms ?? '-'}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent>
              <Typography variant="body2" color="text.secondary">Bookings</Typography>
              <Typography variant="h5" fontWeight="bold">{stats?.totalBookings ?? '-'}</Typography>
            </CardContent></Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Recent Bookings</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Guest</TableCell>
                      <TableCell>Hotel</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((b) => (
                      <TableRow key={b._id}>
                        <TableCell>{new Date(b.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{b.user?.name || '-'}</TableCell>
                        <TableCell>{b.hotel?.name || '-'}</TableCell>
                        <TableCell>{b.status}</TableCell>
                      </TableRow>
                    ))}
                    {bookings.length === 0 && (
                      <TableRow><TableCell colSpan={4}>No data</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Recent Users</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Created</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u._id}>
                        <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.phone}</TableCell>
                      </TableRow>
                    ))}
                    {users.length === 0 && (
                      <TableRow><TableCell colSpan={4}>No data</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


