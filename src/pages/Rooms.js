import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";

const rooms = [
  {
    type: "Deluxe Room",
    image: "https://i.pinimg.com/736x/76/f9/22/76f9226619b99ab7c61345993a4c9475.jpg",
    price: "5000/night"
  },
  {
    type: "Super Delux Room",
    image: "https://i.pinimg.com/736x/53/a9/37/53a937cdf862da224a40f7c2cab72f75.jpg",
    price: "10000/night"
  },
  {
    type: "Standard Room",
    image: "https://i.pinimg.com/736x/76/f9/22/76f9226619b99ab7c61345993a4c9475.jpg",
    price: "3000/night"
  },
];

function Rooms() {
  const navigate = useNavigate();
  const location = useLocation();
  const city = new URLSearchParams(location.search).get("city");

  const handleBookNow = (roomType) => {
    navigate(`/BookDetails?city=${city}&room=${roomType}`);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        Available Rooms {city}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {rooms.map((room, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.3s",
                '&:hover': { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={room.image}
                alt={room.type}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {room.type}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {room.price}
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => handleBookNow(room.type)}
                  sx={{ mt: 2 }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Rooms;
