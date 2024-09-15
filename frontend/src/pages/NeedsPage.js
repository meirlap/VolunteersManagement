// NeedsPage.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { fetchNeeds } from '../services/needsService';

const NeedsPage = () => {
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    handleFetchNeeds();
  }, []);

  const handleFetchNeeds = async () => {
    try {
      const data = await fetchNeeds();
      setNeeds(data);
    } catch (error) {
      console.error('Failed to fetch needs:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Special Residents</TableCell>
              <TableCell>Additional Needs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {needs.map((need) => (
              <TableRow key={need.id}>
                <TableCell>{need.id}</TableCell>
                <TableCell>{need.full_name}</TableCell>
                <TableCell>{need.address}</TableCell>
                <TableCell>{need.special_residents}</TableCell>
                <TableCell>{need.additional_needs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NeedsPage;
