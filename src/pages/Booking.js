import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid, Card, CardMedia, CardContent, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const locations = [
  {
    city: "Chandigarh",
    image: "https://i.pinimg.com/736x/a6/52/10/a652107e4a306d207e236fb847e7ff44.jpg",
  },
  {
    city: "Delhi",
    image: "https://i.pinimg.com/736x/dc/b0/64/dcb064d2adb85ca6cc82a7be246b7c5e.jpg",
  },
  {
    city: "Mumbai",
    image: "https://i.pinimg.com/736x/c6/ce/22/c6ce22ead6f09147647963600bfed645.jpg",
  },
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
        height: "100vh",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
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
            <Grid item xs={12} sm={4} key={index}>
              <Card
                onClick={() => handleLocationClick(loc.city)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  '&:hover': { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={loc.image}
                  alt={loc.city}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {loc.city}
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
