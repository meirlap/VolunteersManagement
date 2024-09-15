// VolunteersManagementPage.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Button } from '@mui/material';
import { fetchVolunteers, deleteVolunteer } from '../services/volunteersService';
import { useNavigate } from 'react-router-dom';

const VolunteersManagementPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchVolunteers();
  }, [searchTerm]);

  const handleFetchVolunteers = async () => {
    try {
      const data = await fetchVolunteers();
      const filteredVolunteers = data.filter(
        (volunteer) =>
          volunteer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          volunteer.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVolunteers(filteredVolunteers);
    } catch (error) {
      console.error('Failed to fetch volunteers:', error);
    }
  };

  const handleEditVolunteer = (id) => {
    navigate(`/edit-volunteer/${id}`);
  };

  const handleAddVolunteer = () => {
    navigate('/create-volunteer');
  };

  const handleDeleteVolunteer = async (id) => {
    try {
      await deleteVolunteer(id);
      handleFetchVolunteers();
    } catch (error) {
      console.error('Failed to delete volunteer:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Search by name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddVolunteer} sx={{ mb: 2 }}>
        Add Volunteer
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Volunteer Field</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.map((volunteer) => (
              <TableRow key={volunteer.id}>
                <TableCell>{volunteer.first_name}</TableCell>
                <TableCell>{volunteer.last_name}</TableCell>
                <TableCell>{volunteer.phone}</TableCell>
                <TableCell>{volunteer.address}</TableCell>
                <TableCell>{volunteer.volunteer_field}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEditVolunteer(volunteer.id)}>
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => handleDeleteVolunteer(volunteer.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VolunteersManagementPage;
