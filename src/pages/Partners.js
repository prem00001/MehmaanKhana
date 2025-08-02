import React from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

function Partners() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Partner With Us
      </Typography>
      <Typography variant="body1" paragraph>
        Join us to expand your business and reach new customers.
      </Typography>
      <List>
        {[
          "Extranet Login",
          "Partner Help & Resources",
          "List Your Property",
          "Become an Affiliate",
          "Corporate Partnerships",
          "Advertise with Us",
        ].map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Partners;
