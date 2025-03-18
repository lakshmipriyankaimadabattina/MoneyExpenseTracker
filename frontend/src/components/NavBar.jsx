import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box,
  Avatar,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const hideOnPages = ['/login', '/register']; 
  if (hideOnPages.includes(location.pathname)) {
    return null;
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Add Expense', icon: <AddIcon />, path: '/expenses' },
    { text: 'Settle Up', icon: <AccountBalanceIcon />, path: '/balance' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250, bgcolor: "#1E2A38", height: "100vh", color: "white" }}>
      <Box sx={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#00bcd4' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: "bold" }}>
          Expense Splitter
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => navigate(item.path)}
            sx={{ 
              '&:hover': { bgcolor: 'rgba(0, 188, 212, 0.2)' },
              bgcolor: location.pathname === item.path ? 'rgba(0, 188, 212, 0.3)' : 'transparent'
            }}
          >
            <ListItemIcon sx={{ color: '#00bcd4' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={3}
        sx={{ 
          background: 'linear-gradient(45deg, #0D253F 30%, #1E2A38 90%)', // Dark theme with sky blue touch
          borderBottom: '2px solid #00bcd4'
        }}
      >
        <Toolbar>
          {/* Mobile View */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Home Button */}
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate("/home")} 
            sx={{ 
              mr: 2,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)', color: "#00bcd4" }
            }}
          >
            <HomeIcon />
          </IconButton>

          {/* Title */}
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              cursor: "pointer",
              fontWeight: 700,
              letterSpacing: '0.5px',
              '&:hover': { opacity: 0.9, color: "#00bcd4" }
            }} 
            onClick={() => navigate("/dashboard")}
          >
            Expense Splitter
          </Typography>
          
          {/* Desktop View - Navigation Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {navItems.map((item) => (
              <Tooltip title={item.text} key={item.text}>
                <Button
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    bgcolor: location.pathname === item.path ? 'rgba(0, 188, 212, 0.2)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(0, 188, 212, 0.3)',
                      transform: 'translateY(-2px)',
                      color: "#00bcd4"
                    }
                  }}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              </Tooltip>
            ))}

            {/* Profile Avatar */}
            <Avatar 
              sx={{ 
                ml: 2,
                width: 36, 
                height: 36, 
                bgcolor: '#00bcd4', 
                color: '#1E2A38',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)', bgcolor: "#03A9F4" },
                fontWeight: 'bold'
              }}
              onClick={() => navigate('/profile')}
            >
              ES
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, bgcolor: "#1E2A38", color: "white" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;




