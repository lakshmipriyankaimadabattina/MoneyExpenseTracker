import React from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <Container component="main" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
