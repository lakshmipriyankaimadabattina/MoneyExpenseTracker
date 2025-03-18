import React from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'black',
        color: 'white',
        position: isHomePage ? 'relative' : 'static',
        bottom: 0,
        width: '100%',
        zIndex: 10,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          © 2025 Money Expense Tracker. All rights reserved.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <IconButton
            color="inherit"
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
