import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid, Card, CardMedia, CardContent, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const locations = [
  {
    city: "Chandigarh",
    image: "https://i.pinimg.com/736x/a6/52/10/a652107e4a306d207e236fb847e7ff44.jpg",
    description: "The City Beautiful"
  },
  {
    city: "Delhi",
    image: "https://i.pinimg.com/736x/dc/b0/64/dcb064d2adb85ca6cc82a7be246b7c5e.jpg",
    description: "Capital City"
  },
  {
    city: "Mumbai",
    image: "https://i.pinimg.com/736x/c6/ce/22/c6ce22ead6f09147647963600bfed645.jpg",
    description: "City of Dreams"
  },
  {
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
    description: "Garden City & IT Hub"
  },
  {
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
    description: "City of Pearls"
  },
  {
    city: "Chennai",
    image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=400&h=300&fit=crop",
    description: "Cultural Capital"
  },
  {
    city: "Kolkata",
    image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=400&h=300&fit=crop",
    description: "City of Joy"
  },
  {
    city: "Pune",
    image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=400&h=300&fit=crop",
    description: "Oxford of the East"
  },
  {
    city: "Jaipur",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
    description: "Pink City"
  },
  {
    city: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=400&h=300&fit=crop",
    description: "Manchester of India"
  },
  {
    city: "Kochi",
    image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=400&h=300&fit=crop",
    description: "Queen of Arabian Sea"
  },
  {
    city: "Goa",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
    description: "Beach Paradise"
  },
  {
    city: "Udaipur",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
    description: "City of Lakes"
  }
];

function Booking() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleLocationClick = (city) => {
    navigate(`/rooms?city=${city}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <Typography variant="h3" textAlign="center" mb={2} sx={{ mt: 2 }}>
        Choose Your Destination
      </Typography>
      <Typography variant="h6" textAlign="center" mb={4} color="text.secondary">
        Select a city to view available rooms and book your stay
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '5px 10px',
            boxShadow: '0px 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search Location..."
            value={search}
            onChange={handleSearch}
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {locations
          .filter((loc) => loc.city.toLowerCase().includes(search))
          .map((loc, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                onClick={() => handleLocationClick(loc.city)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  '&:hover': { 
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)"
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={loc.image}
                  alt={loc.city}
                  sx={{ '&:hover': { opacity: 0.9 } }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="center"
                    mb={1}
                  >
                    {loc.city}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    {loc.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Booking;
