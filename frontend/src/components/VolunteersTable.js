import React, { useState, useEffect } from 'react';
import { fetchVolunteers, fetchVolunteerFields, getCoordinates } from '../services/volunteersService';
import VolunteersTable from '../components/VolunteersTable';
import { Box, TextField, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([]);  // רשימת המתנדבים
  const [fields, setFields] = useState([]);  // תחומי ההתנדבות
  const [selectedFields, setSelectedFields] = useState([]);  // התחומים שנבחרו
  const [filters, setFilters] = useState({ name: '', address: '', maxDistance: '', fields: [] });  // פילטרים
  const [addressCoordinates, setAddressCoordinates] = useState(null);  // קואורדינטות של הכתובת
  const [selectedDistance, setSelectedDistance] = useState('');  // מרחק נבחר

  // טוען את רשימת תחומי ההתנדבות מהשרת
  useEffect(() => {
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

  // טוען את רשימת המתנדבים מהשרת בכל פעם שהפילטרים משתנים
  useEffect(() => {
    const loadVolunteers = async () => {
      try {
        const volunteers = await fetchVolunteers(filters);
        setVolunteers(volunteers);  // עדכון רשימת המתנדבים בסטייט
      } catch (error) {
        console.error('Failed to load volunteers:', error);
      }
    };
    loadVolunteers();
  }, [filters]);

  // מעדכן את הפילטרים לפי השינויים של המשתמש
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // שינוי בתחום התנדבות נבחר
  const handleFieldChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  // שינוי בכתובת והמרחק - מחפש קואורדינטות
  const handleAddressChange = async (event) => {
    const address = event.target.value;
    setFilters((prev) => ({ ...prev, address }));
    
    if (address) {
      try {
        const coords = await getCoordinates(address);
        setAddressCoordinates(coords);
      } catch (error) {
        console.error('Failed to get coordinates:', error);
      }
    } else {
      setAddressCoordinates(null);
    }
  };

  // עדכון המרחק הנבחר
  const handleDistanceChange = (event) => {
    const distance = event.target.value;
    setSelectedDistance(distance);
    setFilters((prev) => ({ ...prev, maxDistance: distance }));
  };

  // לחיצה על כפתור "החלת פילטרים"
  const applyFilters = () => {
    setFilters((prev) => ({ ...prev, fields: selectedFields }));
  };

  return (
    <Box>
      <h1>Volunteer List</h1>
      {/* שדה חיפוש לפי שם */}
      <TextField
        label="Filter by Name"
        name="name"
        onChange={handleFilterChange}
        variant="outlined"
        style={{ marginRight: '10px' }}
      />
      {/* שדה חיפוש לפי כתובת */}
      <TextField
        label="Address"
        name="address"
        onChange={handleAddressChange}
        variant="outlined"
        style={{ marginRight: '10px' }}
      />
      {/* בחירת מרחק */}
      <FormControl sx={{ minWidth: 120, marginRight: '10px' }}>
        <InputLabel>Distance</InputLabel>
        <Select
          value={selectedDistance}
          onChange={handleDistanceChange}
        >
          {[150, 300, 450, 600, 750, 900, 1050].map((distance) => (
            <MenuItem key={distance} value={distance}>
              {distance} meters
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* בחירת תחומי התנדבות */}
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
      {/* כפתור החלת פילטרים */}
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
      {/* טבלת מתנדבים */}
      <VolunteersTable volunteers={volunteers} />
    </Box>
  );
};

export default VolunteersPage;
