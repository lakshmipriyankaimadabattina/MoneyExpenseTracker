import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Fade
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const Home = () => {
  const navigate = useNavigate();

  // Features list
  const features = [
    { icon: <GroupIcon fontSize="large" />, title: "Split Expenses", description: "Divide costs among friends, roommates, or travel companions with ease." },
    { icon: <ReceiptIcon fontSize="large" />, title: "Track Payments", description: "Keep detailed records of who paid what and when." },
    { icon: <AccountBalanceWalletIcon fontSize="large" />, title: "Settle Debts", description: "See who owes whom and settle up with minimal transactions." },
    { icon: <TrendingUpIcon fontSize="large" />, title: "Expense Analytics", description: "Visualize spending patterns and expense categories." }
  ];

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Fade in timeout={800}>
        <Box flexGrow={1}>
          {/* Hero Section */}
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              mb: 6,
              background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
              color: "white",
              position: "relative",
              height: "50vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "white", width: 80, height: 80, margin: "0 auto", mb: 3, boxShadow: 3 }}>
                <AccountBalanceWalletIcon fontSize="large" sx={{ color: "#3f51b5" }} />
              </Avatar>

              <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.2)", mb: 2 }}>
                Expense Splitter
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ opacity: 0.9, mb: 4, maxWidth: "600px", mx: "auto" }}>
                Split expenses with friends, track payments, and settle debts with ease
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  mr: 2, 
                  px: 4, 
                  py: 1.5,
                  bgcolor: "white",
                  color: "#3f51b5",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: 4,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)", transform: "translateY(-2px)", boxShadow: 6, transition: "all 0.3s" }
                }}
                onClick={() => navigate("/dashboard")}
              >
                Get Started
              </Button>
            </Container>
          </Paper>

          {/* Features Section */}
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom sx={{ mb: 4 }}>
            Features & Benefits
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={2} sx={{ height: "100%", borderRadius: 3, transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar sx={{ bgcolor: "primary.light", width: 60, height: 60, margin: "0 auto", mb: 2 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Call to Action */}
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="medium" gutterBottom>
              Ready to simplify expense splitting?
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, px: 5, py: 1.5, borderRadius: 2, fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/dashboard")}>
              Create a Group
            </Button>
          </Box>
        </Box>
      </Fade>

      {/* Footer Section - Always at Bottom */}

    </Box>
  );
};

export default Home;


