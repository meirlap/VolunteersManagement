// VolunteersList.js
import React, { useState, useEffect } from 'react';
import { TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getVolunteers } from '../services/volunteersService'; // Importing the service function to fetch volunteers data

const VolunteersList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch volunteers data on component mount
  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await getVolunteers();
      setVolunteers(data);
    } catch (error) {
      console.error('Failed to fetch volunteers', error);
    }
  };

  // Function to handle the search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter volunteers based on the search term
  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.first_name.toLowerCase().includes(searchTerm) ||
    volunteer.last_name.toLowerCase().includes(searchTerm)
  );

  return (
    <Box>
      {/* Search Input */}
      <TextField
        label="Search Volunteers"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      {/* Table Displaying Volunteers */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Volunteer Field</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVolunteers.map((volunteer) => (
              <TableRow key={volunteer.id}>
                <TableCell>{volunteer.first_name}</TableCell>
                <TableCell>{volunteer.last_name}</TableCell>
                <TableCell>{volunteer.address}</TableCell>
                <TableCell>{volunteer.volunteer_field}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VolunteersList;
