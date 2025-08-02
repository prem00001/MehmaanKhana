import React from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

function TermsAndSettings() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Terms and Settings
      </Typography>
      <Typography variant="body1" paragraph>
        Learn more about our policies, terms, and conditions.
      </Typography>
      <List>
        {[
          "Privacy & Cookies Policy",
          "Terms & Conditions",
          "Grievance Officer",
          "Modern Slavery Statement",
          "Human Rights Statement",
          "Refund & Cancellation Policy",
        ].map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TermsAndSettings;
