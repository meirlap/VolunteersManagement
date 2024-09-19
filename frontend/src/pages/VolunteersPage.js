import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { fetchVolunteers, fetchVolunteerFields } from '../services/volunteersService'; // נוודא שהפונקציות מיובאות נכון

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([]);  // רשימת כל המתנדבים מהשרת
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);  // רשימה מסוננת לתצוגה
  const [fields, setFields] = useState([]);  // רשימת התחומים מהשרת
  const [selectedFields, setSelectedFields] = useState([]);  // תחומים שנבחרו לסינון
  const [searchTerm, setSearchTerm] = useState('');  // חיפוש לפי שם

  // טוען את רשימת התחומים מהשרת בעת טעינת העמוד
  useEffect(() => {
    const loadFields = async () => {
      try {
        const fieldsData = await fetchVolunteerFields();  // קריאה ל-API לטעינת התחומים
        setFields(fieldsData);
      } catch (error) {
        console.error('Failed to load volunteer fields:', error);
      }
    };

    loadFields();
  }, []);

  // טוען את רשימת המתנדבים מהשרת בעת טעינת העמוד
  useEffect(() => {
    const loadVolunteers = async () => {
      try {
        const data = await fetchVolunteers();  // קריאה ל-API לטעינת מתנדבים
        setVolunteers(data);
        setFilteredVolunteers(data);  // ברירת מחדל: כל המתנדבים מוצגים
      } catch (error) {
        console.error('Failed to fetch volunteers:', error);
      }
    };

    loadVolunteers();
  }, []);

  // מסנן את המתנדבים לפי שם ותחומים שנבחרו
  useEffect(() => {
    const filterVolunteers = () => {
      const filtered = volunteers.filter((volunteer) =>
        (volunteer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          volunteer.last_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedFields.length === 0 || selectedFields.some((field) => volunteer.volunteer_field.includes(field)))
      );
      setFilteredVolunteers(filtered);  // עדכון רשימת המתנדבים המסוננת
    };

    filterVolunteers();
  }, [volunteers, searchTerm, selectedFields]);  // מתבצע סינון מחדש כאשר השם, התחומים או רשימת המתנדבים משתנים

  // טיפול בשינוי בשדה החיפוש
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // טיפול בשינוי בתחומי ההתנדבות שנבחרו
  const handleFieldChange = (event) => {
    const { target: { value } } = event;
    setSelectedFields(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="חפש לפי שם"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>סנן מתנדבים לפי תחום</InputLabel>
        <Select
          multiple
          value={selectedFields}
          onChange={handleFieldChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {fields.map((field) => (
            <MenuItem key={field} value={field}>
              <Checkbox checked={selectedFields.indexOf(field) > -1} />
              <ListItemText primary={field} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Volunteer Field</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVolunteers.map((volunteer) => (
              <TableRow key={volunteer.id}>
                <TableCell>{volunteer.first_name}</TableCell>
                <TableCell>{volunteer.last_name}</TableCell>
                <TableCell>{volunteer.phone}</TableCell>
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

export default VolunteersPage;
