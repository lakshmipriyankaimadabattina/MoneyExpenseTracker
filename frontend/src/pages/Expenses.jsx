import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Box,
  Divider,
  Card,
  CardContent,
  Chip,
  IconButton,
  Fade,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaidIcon from "@mui/icons-material/Paid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";

const Expenses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedGroup = queryParams.get("group");

  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(selectedGroup || "");
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);

    if (selected) {
      const group = storedGroups.find((g) => g.name === selected);
      setExpenses(group ? group.expenses : []);
      setMembers(group ? group.members : []);
    }
  }, [selected]);

  const handleAddExpense = () => {
    if (!selected || !expenseName || !amount || !paidBy) {
      alert("Please fill all fields.");
      return;
    }

    const newExpense = { name: expenseName, amount, paidBy };
    const updatedGroups = groups.map((group) =>
      group.name === selected
        ? { ...group, expenses: [...group.expenses, newExpense] }
        : group
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setAmount("");
    setPaidBy("");
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 5,
          borderRadius: 3,
          background: "linear-gradient(to right, #f5f7fa, #ffffff)",
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <ReceiptLongIcon
            sx={{ fontSize: 34, color: "#3f51b5", marginRight: 2 }}
          />
          <Typography variant="h4" fontWeight="600" color="#3f51b5">
            Manage Expenses
          </Typography>
        </Box>

        <Card
          variant="outlined"
          sx={{
            mb: 4,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent>
            <TextField
              select
              fullWidth
              label="Select Group"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              {groups.map((group, index) => (
                <MenuItem key={index} value={group.name}>
                  {group.name}
                </MenuItem>
              ))}
            </TextField>
          </CardContent>
        </Card>

        {selected && (
          <Fade in={!!selected}>
            <Box>
              <Card
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: "1px solid #e0e0e0",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight="500"
                    color="#424242"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PaidIcon sx={{ mr: 1, color: "#4caf50" }} />
                    New Expense
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Expense Name"
                        variant="outlined"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Amount"
                        type="number"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                          startAdornment: <Typography mr={1}>₹</Typography>,
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="Who Paid?"
                        variant="outlined"
                        value={paidBy}
                        onChange={(e) => setPaidBy(e.target.value)}
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      >
                        {members.length > 0 ? (
                          members.map((member, index) => (
                            <MenuItem key={index} value={member}>
                              <Box display="flex" alignItems="center">
                                <PersonIcon
                                  fontSize="small"
                                  sx={{ mr: 1, color: "#9c27b0" }}
                                />
                                {member}
                              </Box>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No members added</MenuItem>
                        )}
                      </TextField>
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    onClick={handleAddExpense}
                    disabled={members.length === 0}
                    sx={{
                      mt: 3,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)",
                      boxShadow: "0 3px 5px 2px rgba(63, 81, 181, .3)",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "10px 20px",
                    }}
                    startIcon={<AttachMoneyIcon />}
                  >
                    Add Expense
                  </Button>
                </CardContent>
              </Card>

              <Box sx={{ mb: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    fontWeight="500"
                    color="#424242"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <AccountBalanceWalletIcon sx={{ mr: 1, color: "#ff9800" }} />
                    Expense List
                  </Typography>
                  {expenses.length > 0 && (
                    <Chip
                      label={`Total: ₹${totalExpenses.toFixed(2)}`}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: "bold" }}
                    />
                  )}
                </Box>

                <Grid container spacing={2}>
                  {expenses.length > 0 ? (
                    expenses.map((expense, index) => (
                      <Grid item xs={12} key={index}>
                        <Card
                          sx={{
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          <CardContent>
                            <Grid container alignItems="center">
                              <Grid item xs={6} sm={8}>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="600"
                                  color="#424242"
                                >
                                  {expense.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Paid by: {expense.paidBy}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                sm={4}
                                sx={{ textAlign: "right" }}
                              >
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  color="#4caf50"
                                >
                                  ₹{Number(expense.amount).toFixed(2)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "#f5f5f5",
                          borderRadius: 2,
                        }}
                      >
                        <Typography color="text.secondary">
                          No expenses added yet. Start by adding your first expense!
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/dashboard")}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "16px",
                    padding: "8px 16px",
                  }}
                >
                  Back to Dashboard
                </Button>

                {expenses.length > 0 && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/balance?group=${selected}`)}
                    sx={{
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)",
                      boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "10px 20px",
                    }}
                    startIcon={<AccountBalanceWalletIcon />}
                  >
                    Settle Up
                  </Button>
                )}
              </Box>
            </Box>
          </Fade>
        )}
      </Paper>
    </Container>
  );
};

export default Expenses;


