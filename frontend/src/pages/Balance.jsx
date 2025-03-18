import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Fade,
  CircularProgress,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

const Balance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedGroup = queryParams.get("group");

  const [groups, setGroups] = useState([]);
  const [balances, setBalances] = useState([]);
  const [selected, setSelected] = useState(selectedGroup || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
    if (selected) {
      calculateBalances(selected, storedGroups);
    }
    setIsLoading(false);
  }, [selected]);

  const calculateBalances = (groupName, storedGroups) => {
    const group = storedGroups.find((g) => g.name === groupName);
    if (!group || group.expenses.length === 0 || group.members.length === 0) {
      setBalances([]);
      return;
    }

    let balanceSheet = {};
    group.members.forEach((member) => (balanceSheet[member] = 0));

    group.expenses.forEach(({ paidBy, amount }) => {
      const splitAmount = parseFloat(amount) / group.members.length;
      group.members.forEach((member) => {
        if (member !== paidBy) {
          balanceSheet[member] -= splitAmount;
          balanceSheet[paidBy] += splitAmount;
        }
      });
    });

    let transactions = [];
    let debtors = Object.keys(balanceSheet).filter((person) => balanceSheet[person] < 0);
    let creditors = Object.keys(balanceSheet).filter((person) => balanceSheet[person] > 0);

    debtors.forEach((debtor) => {
      creditors.forEach((creditor) => {
        if (balanceSheet[debtor] < 0 && balanceSheet[creditor] > 0) {
          const amount = Math.min(Math.abs(balanceSheet[debtor]), balanceSheet[creditor]);
          transactions.push({ debtor, creditor, amount: amount.toFixed(2) });

          balanceSheet[debtor] += amount;
          balanceSheet[creditor] -= amount;
        }
      });
    });

    setBalances(transactions);
  };

  const settleUp = (debtor, creditor) => {
    let updatedGroups = [...groups];
    let groupIndex = updatedGroups.findIndex((g) => g.name === selected);

    if (groupIndex !== -1) {
      updatedGroups[groupIndex].expenses = updatedGroups[groupIndex].expenses.map((exp) => {
        if (exp.paidBy === debtor) {
          exp.amount = "0";
        }
        return exp;
      });

      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      setGroups(updatedGroups);
      calculateBalances(selected, updatedGroups);
    }
  };

  // Function to generate avatar background color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "#f44336", "#e91e63", "#9c27b0", "#673ab7", 
      "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", 
      "#009688", "#4caf50", "#8bc34a", "#cddc39",
      "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  // Function to get initials from name
  const getInitials = (name) => {
    return name.split(" ").map(part => part[0]).join("").toUpperCase();
  };

  // Calculate total amount to be settled
  const totalAmount = balances.reduce((sum, transaction) => 
    sum + parseFloat(transaction.amount), 0).toFixed(2);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Fade in={true} timeout={600}>
          <Paper 
            elevation={3} 
            sx={{ 
              width: "100%",
              padding: 4, 
              marginTop: 5, 
              borderRadius: 3,
              background: "linear-gradient(135deg, #f6f9fc 0%, #f1f4f9 100%)"
            }}
          >
            <Box 
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3
              }}
            >
              <Box 
                sx={{
                  p: 1.5,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <AccountBalanceIcon sx={{ color: "white", fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="600" color="#333">
                  Settlements
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Group: {selected}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {isLoading ? (
              <Box 
                sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  height: 200 
                }}
              >
                <CircularProgress />
              </Box>
            ) : balances.length > 0 ? (
              <>
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    mb: 3
                  }}
                >
                  <Typography variant="h6">
                    Outstanding Balances
                  </Typography>
                  <Chip 
                    icon={<CreditCardIcon />} 
                    label={`Total: ₹${totalAmount}`} 
                    color="primary" 
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Grid container spacing={3}>
                  {balances.map((balance, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card 
                        elevation={2}
                        sx={{
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
                          }
                        }}
                      >
                        <CardContent>
                          <Box 
                            sx={{ 
                              display: "flex", 
                              justifyContent: "space-between",
                              mb: 2
                            }}
                          >
                            <Typography variant="h6" color="#333" fontWeight="bold">
                              ₹{balance.amount}
                            </Typography>
                            <Chip 
                              size="small" 
                              label="Pending" 
                              color="warning"
                            />
                          </Box>
                          
                          <Box 
                            sx={{ 
                              display: "flex", 
                              alignItems: "center",
                              mb: 3,
                              justifyContent: "space-between"
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: getAvatarColor(balance.debtor),
                                  fontWeight: "bold"
                                }}
                              >
                                {getInitials(balance.debtor)}
                              </Avatar>
                              <Box ml={1.5}>
                                <Typography variant="body1" fontWeight="500">
                                  {balance.debtor}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Owes money
                                </Typography>
                              </Box>
                            </Box>
                            
                            <SwapHorizIcon sx={{ color: "#9e9e9e" }} />
                            
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box mr={1.5} sx={{ textAlign: "right" }}>
                                <Typography variant="body1" fontWeight="500">
                                  {balance.creditor}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Receives money
                                </Typography>
                              </Box>
                              <Avatar 
                                sx={{ 
                                  bgcolor: getAvatarColor(balance.creditor),
                                  fontWeight: "bold"
                                }}
                              >
                                {getInitials(balance.creditor)}
                              </Avatar>
                            </Box>
                          </Box>
                          
                          <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircleOutlineIcon />}
                            onClick={() => settleUp(balance.debtor, balance.creditor)}
                            sx={{
                              borderRadius: "8px",
                              py: 1,
                              background: "linear-gradient(to right, #43a047, #66bb6a)",
                              boxShadow: "0 4px 10px rgba(76, 175, 80, 0.2)",
                              textTransform: "none",
                              fontSize: "16px"
                            }}
                          >
                            Mark as Settled
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Box 
                sx={{ 
                  textAlign: "center", 
                  py: 5,
                  background: "rgba(76, 175, 80, 0.08)",
                  borderRadius: 3,
                  border: "1px dashed #66bb6a"
                }}
              >
                <MoneyOffIcon sx={{ fontSize: 56, color: "#66bb6a", mb: 2 }} />
                <Typography variant="h6" gutterBottom color="#2e7d32" fontWeight="bold">
                  All expenses are settled!
                </Typography>
                <Typography>
                  There are no outstanding balances for this group.
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/dashboard")}
                sx={{
                  borderRadius: 8,
                  py: 1.2,
                  px: 3,
                  borderWidth: 2,
                  borderColor: "#3f51b5",
                  color: "#3f51b5",
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": {
                    borderWidth: 2,
                    bgcolor: "rgba(63, 81, 181, 0.08)"
                  }
                }}
              >
                Back to Dashboard
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
};

export default Balance;








