import React from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

function Support() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Support Center
      </Typography>
      <Typography variant="body1" paragraph>
        Need help? Find answers to your questions or contact our support team.
      </Typography>
      <List>
        {[
          "COVID-19 FAQs",
          "Manage Your Trips",
          "Contact Customer Service",
          "Safety Resource Center",
          "Booking Cancellations & Refunds",
          "Technical Support",
        ].map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Support;
