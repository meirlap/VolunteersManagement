import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const CreateNeedPage = ({ onSave }) => {
  const [formState, setFormState] = useState({
    full_name: '',
    address: '',
    apartment_count: '',
    phone: '',
    whatsapp_group: '',
    special_residents: '',
    additional_needs: '',
    event_attendance: ''
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        יצירת צורך חדש
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="שם מלא"
          name="full_name"
          value={formState.full_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="כתובת"
          name="address"
          value={formState.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="מספר דירות בבניין"
          name="apartment_count"
          value={formState.apartment_count}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="טלפון"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="קבוצת ווטצאפ"
          name="whatsapp_group"
          value={formState.whatsapp_group}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="תושבים מיוחדים"
          name="special_residents"
          value={formState.special_residents}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="צרכים נוספים"
          name="additional_needs"
          value={formState.additional_needs}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="השתתפות באירוע"
          name="event_attendance"
          value={formState.event_attendance}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          שמור
        </Button>
      </form>
    </Box>
  );
};

export default CreateNeedPage;
