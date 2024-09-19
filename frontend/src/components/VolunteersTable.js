import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { fetchVolunteers } from '../services/volunteersService';

const VolunteersTable = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Fetch volunteers from the API
    const getVolunteers = async () => {
      try {
        const data = await fetchVolunteers();
        setVolunteers(data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    getVolunteers();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        רשימת מתנדבים
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>שם פרטי</TableCell>
            <TableCell>שם משפחה</TableCell>
            <TableCell>כתובת</TableCell>
            <TableCell>טלפון</TableCell>
            <TableCell>תחום התנדבות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volunteers.map((volunteer) => (
            <TableRow key={volunteer.id}>
              <TableCell>{volunteer.first_name}</TableCell>
              <TableCell>{volunteer.last_name}</TableCell>
              <TableCell>{volunteer.address}</TableCell>
              <TableCell>{volunteer.phone}</TableCell>
              <TableCell>{volunteer.volunteer_field}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VolunteersTable;
