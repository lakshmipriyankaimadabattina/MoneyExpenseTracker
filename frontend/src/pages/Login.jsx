import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
  Fade,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", storedUser.userName);
    
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    alert("Login successful!");
    navigate("/home"); // Redirect to Dashboard
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Fade in timeout={800}>
        <Paper 
          elevation={10} 
          sx={{ 
            padding: 4, 
            marginTop: 8,
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            position: "relative",
            textAlign: "center"
          }}
        >
          <Box 
            sx={{ 
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "5px",
              background: "linear-gradient(90deg, #3f51b5, #2196f3, #03a9f4)"
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
              sx={{
                m: 1,
                bgcolor: "primary.main",
                width: 56,
                height: 56,
                boxShadow: 2,
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" fontWeight="500" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Sign in to Expense Splitter
            </Typography>
          </Box>
          
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                }
              }}
            />
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link 
                component="button" 
                variant="body2" 
                onClick={() => {/* Handle forgot password */}}
                underline="hover"
              >
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                mt: 3, 
                mb: 2, 
                borderRadius: 2,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: 4,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                  transition: "all 0.3s"
                }
              }}
            >
              Sign In
            </Button>
          </Box>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>
          
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body1">
              Don't have an account?
            </Typography>
            <Button 
              color="secondary" 
              variant="outlined"
              onClick={() => navigate("/register")}
              sx={{ 
                mt: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "medium"
              }}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Login;

