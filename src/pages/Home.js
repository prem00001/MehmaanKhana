import React from "react";
import { Box, Typography, Button, Grid, TextField, Card, CardMedia, CardContent, Container } from "@mui/material";

function Home() {
    const rooms = [
        { img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", title: "Simple Deluxe Room", price: "$299 / Night" },
        { img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", title: "Luxury Super Deluxe", price: "$399 / Night" },
        { img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", title: "Simple Family Room", price: "$499 / Night" },
        { img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", title: "Luxury Family Deluxe", price: "$599 / Night" }
      ];
      

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "80vh",
          backgroundImage: "url('images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1
          }
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h2" fontWeight="bold">Welcome to Rovero Hotel</Typography>
          <Typography variant="h5" mt={2} maxWidth={600} mx="auto">
            Experience the ultimate luxury and comfort with our world-class hospitality.
          </Typography>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <TextField type="date" variant="outlined" sx={{ backgroundColor: "white", borderRadius: 1 }} />
            <TextField type="date" variant="outlined" sx={{ backgroundColor: "white", borderRadius: 1 }} />
            <TextField type="number" variant="outlined" placeholder="Guests" sx={{ backgroundColor: "white", borderRadius: 1 }} />
            <Button variant="contained" color="warning" size="large">Check Availability</Button>
          </Box>
        </Box>
      </Box>
      
      {/* Rooms Section */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h3" textAlign="center" mb={5}>Our Exclusive Rooms</Typography>
        <Grid container spacing={4}>
          {rooms.map((room, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
                <CardMedia component="img" height="250" image={room.img} alt={room.title} />
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">{room.title}</Typography>
                  <Typography variant="body1" color="text.secondary" mt={1}>{room.price}</Typography>
                  <Button fullWidth variant="contained" color="warning" sx={{ mt: 2 }}>Book Now</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={5}>
          <Button variant="contained" color="warning" size="large">Load More</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
