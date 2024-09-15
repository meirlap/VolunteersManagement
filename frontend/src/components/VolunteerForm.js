// VolunteerForm.js
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';

const volunteerFieldsOptions = [
  'צרכים פיזיולוגיים בסיסיים - כגון: סיוע במזון, סיוע כספי וכו\'',
  'בטחון פיזי בסיסי - כגון: חרום ובטחון, תעסוקה, בריאות, רכוש וכו\'',
  'שייכות וזהות - כגון: הפגת בדידות, פעילות תרבות וכו\'',
  'כבוד והערכה - כגון: גיבוש זהות והערכה עצמית, סיוע בטיפול תומך וכו\'',
  'מימוש עצמי - כגון: פיתוח כישורי חיים, ביטוי ויצירה עצמית וכו\'',
  'לא מתנדב בשגרה',
  'אחר...'
];

const VolunteerForm = ({ volunteer, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    address: '',
    volunteer_field: [],
  });

  useEffect(() => {
    if (volunteer) {
      setFormState(volunteer);
    }
  }, [volunteer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleVolunteerFieldChange = (event) => {
    const { value } = event.target;
    setFormState({ ...formState, volunteer_field: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="First Name"
        name="first_name"
        value={formState.first_name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formState.last_name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Address"
        name="address"
        value={formState.address}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>תחומי התנדבות</InputLabel>
        <Select
          label="תחומי התנדבות"
          name="volunteer_field"
          multiple
          value={formState.volunteer_field}
          onChange={handleVolunteerFieldChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {volunteerFieldsOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={formState.volunteer_field.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default VolunteerForm;
