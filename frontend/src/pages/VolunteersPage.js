// VolunteersPage.js
import React, { useState, useEffect } from 'react';
import { fetchVolunteers, fetchVolunteerFields } from '../services/volunteersService';
import VolunteersTable from '../components/VolunteersTable';
import { Box, TextField, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState({ name: '', address: '', maxDistance: '', fields: [] });

  useEffect(() => {
    // קריאת רשימת התחומים מהשרת
    const loadFields = async () => {
      try {
        const fields = await fetchVolunteerFields();
        setFields(fields);
      } catch (error) {
        console.error('Failed to load volunteer fields:', error);
      }
    };

    loadFields();
  }, []);

  useEffect(() => {
    // קריאה לקבלת רשימת המתנדבים מהשרת
    const loadVolunteers = async () => {
      try {
        const volunteers = await fetchVolunteers(filters);
        setVolunteers(volunteers);
      } catch (error) {
        console.error('Failed to load volunteers:', error);
      }
    };

    loadVolunteers();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const applyFilters = () => {
    setFilters((prev) => ({ ...prev, fields: selectedFields }));
  };

  return (
    <Box>
      <h1>Volunteer List</h1>
      <TextField
        label="Filter by Name"
        name="name"
        onChange={handleFilterChange}
        variant="outlined"
        style={{ marginRight: '10px' }}
      />
      <TextField
        label="Address"
        name="address"
        onChange={handleFilterChange}
        variant="outlined"
        style={{ marginRight: '10px' }}
      />
      {/* דרופדאון לבחירת תחומי ההתנדבות */}
      <FormGroup row>
        {fields.map((field, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedFields.includes(field)}
                onChange={() => handleFieldChange(field)}
              />
            }
            label={field}
          />
        ))}
      </FormGroup>
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
      <VolunteersTable volunteers={volunteers} />
    </Box>
  );
};

export default VolunteersPage;
