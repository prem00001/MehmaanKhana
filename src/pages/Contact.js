import React from "react";
import { Container, TextField, Button, Typography, Grid, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Contact() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto", mb: 4 }}>
        Have questions or need assistance? Reach out to us and we’ll be happy to help.
      </Typography>

      {/* Contact Form */}
      <Box component="form" sx={{ maxWidth: "600px", mx: "auto", boxShadow: 3, p: 4, borderRadius: 2 }}>
        <TextField fullWidth label="Your Name" margin="normal" />
        <TextField fullWidth label="Your Email" type="email" margin="normal" />
        <TextField fullWidth label="Message" multiline rows={4} margin="normal" />
        <Button variant="contained" sx={{ mt: 2, width: "100%", backgroundColor: "#f1c40f", color: "black" }}>
          Send Message
        </Button>
      </Box>

      {/* Contact Details */}
      <Grid container spacing={3} sx={{ mt: 5 }} justifyContent="center">
        <Grid item xs={12} sm={4} textAlign="center">
          <EmailIcon sx={{ fontSize: 40, color: "#f1c40f" }} />
          <Typography variant="h6">Email</Typography>
          <Typography variant="body2">info@roverohotel.com</Typography>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="center">
          <PhoneIcon sx={{ fontSize: 40, color: "#f1c40f" }} />
          <Typography variant="h6">Phone</Typography>
          <Typography variant="body2">+1 (234) 567-890</Typography>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="center">
          <LocationOnIcon sx={{ fontSize: 40, color: "#f1c40f" }} />
          <Typography variant="h6">Location</Typography>
          <Typography variant="body2">123 Luxury St, New York, USA</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;
