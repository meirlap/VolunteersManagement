// VolunteersPage.js
import React, { useState, useEffect } from 'react';
import { fetchVolunteers } from '../services/volunteersService';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    fields: [],
    address: '',
    maxDistance: 5000, // Default max distance (5 km)
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVolunteers(filters);
        setVolunteers(data);
      } catch (error) {
        console.error('Error fetching filtered volunteers:', error);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <h2>Volunteer List</h2>
      <TextField
        label="Filter by Name"
        variant="outlined"
        name="name"
        value={filters.name}
        onChange={handleFilterChange}
      />
      <FormControl>
        <InputLabel>Max Distance (meters)</InputLabel>
        <Select
          name="maxDistance"
          value={filters.maxDistance}
          onChange={handleFilterChange}
        >
          {[150, 300, 450, 600].map((distance) => (
            <MenuItem key={distance} value={distance * 100}>
              {distance} meters
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={() => setFilters(filters)}>Apply Filters</Button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Field of Volunteering</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            <tr key={volunteer.id}>
              <td>{volunteer.first_name}</td>
              <td>{volunteer.last_name}</td>
              <td>{volunteer.address}</td>
              <td>{volunteer.volunteer_field}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteersPage;
