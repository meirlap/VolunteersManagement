// src/components/NeedsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const NeedsList = ({ needs, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Special Residents</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {needs.map((need) => (
            <TableRow key={need.id}>
              <TableCell>{need.full_name}</TableCell>
              <TableCell>{need.address}</TableCell>
              <TableCell>{need.phone}</TableCell>
              <TableCell>{need.special_residents}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/edit-need/${need.id}`}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(need.id)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NeedsList;
