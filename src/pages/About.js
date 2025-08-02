import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

function About() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        About Rovero Hotel
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}>
        Experience world-class hospitality and luxury at Rovero Hotel. With elegant rooms, exquisite dining, and top-notch facilities, we ensure your stay is unforgettable.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="300" image="https://i.pinimg.com/736x/79/ba/46/79ba463c09cae3f2543c6b237a11f8d8.jpg" alt="Hotel Interior" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Established in 2005, Rovero Hotel has been a beacon of comfort and elegance. Our hotel blends modern amenities with traditional hospitality, offering an unparalleled experience.
            </Typography>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
              Why Choose Us?
            </Typography>
            <ul>
              <li>🏨 Luxurious & Spacious Rooms</li>
              <li>🍽️ World-Class Dining Experience</li>
              <li>🏊‍♂️ Premium Facilities & Spa</li>
              <li>🌍 Prime Location Near Attractions</li>
            </ul>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
