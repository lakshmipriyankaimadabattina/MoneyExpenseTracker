import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Chip,
  Tooltip,
  Fade,
  Zoom,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [newMembers, setNewMembers] = useState({});
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      alert("You're not logged in!");
      navigate("/login");
      return;
    }

    setUserName(userData.userName);
    fetchGroups();
  }, [navigate]);

  const fetchGroups = () => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
  };

  const createGroup = () => {
    if (!groupName.trim()) return alert("Enter a valid group name!");

    const newGroup = { name: groupName, members: [], expenses: [] };
    const updatedGroups = [...groups, newGroup];

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setGroupName("");
  };

  const addMember = (groupName) => {
    const memberName = newMembers[groupName]?.trim();

    if (!memberName) return alert("Enter a valid member name!");

    const updatedGroups = groups.map((group) =>
      group.name === groupName
        ? { ...group, members: [...group.members, memberName] }
        : group
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);

    setNewMembers((prev) => ({ ...prev, [groupName]: "" }));
  };

  const removeMember = (groupName, member) => {
    const updatedGroups = groups.map((group) =>
      group.name === groupName
        ? { ...group, members: group.members.filter((m) => m !== member) }
        : group
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
  };

  const deleteGroup = (groupName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the group "${groupName}"?`);
    if (!confirmDelete) return;

    const updatedGroups = groups.filter((group) => group.name !== groupName);

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    handleCloseMenu();
  };

  const handleOpenMenu = (event, group) => {
    setMenuAnchor(event.currentTarget);
    setActiveGroup(group);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setActiveGroup(null);
  };

  // Get first letter of each word for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Get random pastel color based on group name
  const getGroupColor = (name) => {
    const colors = [
      "#FFB6C1", "#FFD700", "#98FB98", "#87CEFA", 
      "#DDA0DD", "#FFDAB9", "#B0E0E6", "#F0E68C"
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <Container component="main" maxWidth="md">
      <Fade in timeout={800}>
        <Paper 
          elevation={6} 
          sx={{ 
            padding: 4, 
            marginTop: 5, 
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Box 
            sx={{ 
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "5px",
              background: "linear-gradient(90deg, #3f51b5, #2196f3, #03a9f4)"
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "center" }}>
            <Avatar 
              sx={{ 
                bgcolor: "primary.main", 
                width: 64, 
                height: 64,
                mr: 2,
                boxShadow: 2
              }}
            >
              {userName && getInitials(userName)}
            </Avatar>
            <Typography variant="h4" fontWeight="500">
              Welcome, {userName}!
            </Typography>
          </Box>

          {/* Create Group Section */}
          <Paper 
            elevation={2}
            sx={{ 
              padding: 3, 
              mb: 4, 
              borderRadius: 2,
              background: "linear-gradient(145deg, #fafafa, #ffffff)"
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="500" sx={{ display: "flex", alignItems: "center" }}>
              <GroupIcon sx={{ mr: 1 }} /> Create New Group
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                label="Group Name"
                variant="outlined"
                fullWidth
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name..."
                sx={{ 
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={createGroup}
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  fontWeight: "medium",
                  textTransform: "none"
                }}
              >
                Create
              </Button>
            </Box>
          </Paper>

          <Typography variant="h6" fontWeight="500" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <GroupIcon sx={{ mr: 1 }} /> Your Groups ({groups.length})
          </Typography>

          <Grid container spacing={3}>
            {groups.length > 0 ? (
              groups.map((group, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Zoom in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card 
                      elevation={2} 
                      sx={{ 
                        borderRadius: 2,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: 4
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: getGroupColor(group.name),
                                color: "rgba(0,0,0,0.7)",
                                mr: 1.5
                              }}
                            >
                              {getInitials(group.name)}
                            </Avatar>
                            <Typography variant="h6" fontWeight="500">
                              {group.name}
                            </Typography>
                          </Box>
                          <IconButton onClick={(e) => handleOpenMenu(e, group)}>
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                        
                        <Divider sx={{ my: 1.5 }} />
                        
                        {/* Members Section */}
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                          {group.members.length} Members
                        </Typography>
                        
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                          {group.members.length > 0 ? (
                            group.members.map((member, i) => (
                              <Tooltip title={`Remove ${member}`} key={i}>
                                <Chip 
                                  label={member}
                                  size="small"
                                  onDelete={() => removeMember(group.name, member)}
                                  deleteIcon={<PersonRemoveIcon fontSize="small" />}
                                  sx={{ borderRadius: 1.5 }}
                                />
                              </Tooltip>
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                              No members yet
                            </Typography>
                          )}
                        </Box>
                        
                        {/* Add Member */}
                        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                          <TextField
                            label="Add Member"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={newMembers[group.name] || ""}
                            onChange={(e) =>
                              setNewMembers((prev) => ({ ...prev, [group.name]: e.target.value }))
                            }
                            sx={{ 
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2
                              }
                            }}
                          />
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => addMember(group.name)}
                            startIcon={<PersonAddIcon />}
                            sx={{ 
                              borderRadius: 2,
                              textTransform: "none"
                            }}
                          >
                            Add
                          </Button>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate(`/expenses?group=${group.name}`)}
                          startIcon={<ReceiptIcon />}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: "none"
                          }}
                        >
                          Expenses
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => navigate(`/balance?group=${group.name}`)}
                          startIcon={<AccountBalanceIcon />}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: "none"
                          }}
                        >
                          Settle Up
                        </Button>
                      </CardActions>
                    </Card>
                  </Zoom>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 4, 
                    textAlign: "center", 
                    bgcolor: "#f9f9f9",
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No groups yet. Create one to get started!
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={() => navigate("/login")} 
              startIcon={<LogoutIcon />}
              sx={{ 
                px: 3, 
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "medium"
              }}
            >
              Logout
            </Button>
          </Box>

          {/* Group actions menu */}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: { borderRadius: 2, boxShadow: 3 }
            }}
          >
            <MenuItem onClick={() => deleteGroup(activeGroup?.name)} dense>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete Group</ListItemText>
            </MenuItem>
          </Menu>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Dashboard;






