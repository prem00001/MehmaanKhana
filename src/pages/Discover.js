import React from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

function Discover() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Discover More
      </Typography>
      <Typography variant="body1" paragraph>
        Explore exclusive deals, travel insights, and our unique offerings.
      </Typography>
      <List>
        {[
          "Genius Loyalty Program",
          "Seasonal & Holiday Deals",
          "Travel Articles & Tips",
          "Traveller Review Awards",
          "Car Rental Services",
          "Flight Finder & Discounts",
          "Restaurant Reservations",
        ].map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Discover;
