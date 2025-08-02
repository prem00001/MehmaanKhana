import React from "react";
import { Box, Typography, TextField, Button, Container, Paper } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

function Login() {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #4B79A1 0%, #283E51 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={10} sx={{ p: 4, borderRadius: 4, width: 400 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Sign in or Create an Account
        </Typography>
        <TextField
          label="Email Address"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            backgroundColor: "#4B79A1",
            '&:hover': { backgroundColor: "#283E51" }
          }}
        >
          Continue with Email
        </Button>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2, color: '#888' }}>
          ───── or sign in using ─────
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<GoogleIcon />}
            sx={{
              borderColor: "#4B79A1",
              color: "#4B79A1",
              '&:hover': { backgroundColor: "#4B79A1", color: "#fff" }
            }}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AppleIcon />}
            sx={{
              borderColor: "#4B79A1",
              color: "#4B79A1",
              '&:hover': { backgroundColor: "#4B79A1", color: "#fff" }
            }}
          >
            Apple
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FacebookIcon />}
            sx={{
              borderColor: "#4B79A1",
              color: "#4B79A1",
              '&:hover': { backgroundColor: "#4B79A1", color: "#fff" }
            }}
          >
            Facebook
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2, color: '#888' }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
