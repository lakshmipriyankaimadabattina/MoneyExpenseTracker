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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    const userData = { userName: name, email, password };
    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Registration successful! Please log in.");
    navigate("/login"); // Redirect to Login page
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
            textAlign: "center",
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
          }}
        >
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
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" fontWeight="500" gutterBottom>
              Join Us
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Create your account to get started
            </Typography>
          </Box>
          
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="primary" />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
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
              Create Account
            </Button>
          </Box>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            Already have an account?
          </Typography>
          <Button 
            color="secondary" 
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{ 
              mt: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "medium"
            }}
          >
            Sign In
          </Button>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Register;