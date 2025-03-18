import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  CssBaseline,
  Button,
  TextField,
  Modal,
} from "@mui/material";

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    if (userData) {
      const response = await axios.get(`http://localhost:5019/api/Groups/GetUserGroups/${userData.userName}`);
      setGroups(response.data);
    }
  };

  const createGroup = async () => {
    if (!userData || !userData.userName) {
      alert("User data not found. Please log in again.");
      return;
    }

    if (groupName.trim() === "") return;

    await axios.post("http://localhost:5019/api/Groups/CreateGroup", {
      groupName,
      createdBy: userData.userName,
    });

    setGroupName("");
    fetchGroups();
  };

  const openAddMemberModal = (group) => {
    setSelectedGroup(group);
    setOpenModal(true);
  };

  const addMember = async () => {
    if (memberName.trim() === "") return;

    await axios.post("http://localhost:5019/api/Groups/AddMember", {
      groupName: selectedGroup.groupName,
      memberName,
    });

    setMemberName("");
    setOpenModal(false);
    fetchGroups();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Group Management
        </Typography>

        <Box display="flex" gap={2} marginBottom={2}>
          <TextField
            label="Group Name"
            variant="outlined"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={createGroup}
          >
            Create
          </Button>
        </Box>

        <Grid container spacing={2}>
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={2}
                  border={1}
                  borderRadius={2}
                >
                  <Typography>{group.groupName}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => openAddMemberModal(group)}
                  >
                    Add Members
                  </Button>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography>No groups created yet.</Typography>
          )}
        </Grid>
      </Paper>

      {/* Modal for Adding Members */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper
          sx={{
            width: 400,
            padding: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Add Member to {selectedGroup?.groupName}</Typography>
          <TextField
            label="Member Name"
            fullWidth
            variant="outlined"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
            <Button variant="contained" onClick={addMember}>
              Add
            </Button>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

export default GroupManagement;
