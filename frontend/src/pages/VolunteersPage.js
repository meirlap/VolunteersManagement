import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchVolunteers, fetchVolunteerFields, fetchVolunteersByAddressAndDistance } from '../services/volunteersService';

const VolunteersPage = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [address, setAddress] = useState('');
    const [maxDistance, setMaxDistance] = useState('');

    // טוען את רשימת התחומים והמתנדבים מהשרת
    useEffect(() => {
        const loadFields = async () => {
            const fieldsData = await fetchVolunteerFields();
            setFields(fieldsData);
        };

        const loadVolunteers = async () => {
            const data = await fetchVolunteers();
            setVolunteers(data);
            setFilteredVolunteers(data);
        };

        loadFields();
        loadVolunteers();
    }, []);

    // מרענן את הרשימה כשיש שינוי במסננים
    useEffect(() => {
        handleFilter();
    }, [searchTerm, selectedFields, address, maxDistance]);

    // פונקציה לסינון המתנדבים
    const handleFilter = async () => {
        let currentVolunteers = [...volunteers];

        // סינון לפי שם ותחום התנדבות
        currentVolunteers = currentVolunteers.filter(volunteer => {
            const nameMatch = volunteer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || volunteer.last_name.toLowerCase().includes(searchTerm.toLowerCase());
            const fieldMatch = selectedFields.length === 0 || selectedFields.some(field => volunteer.volunteer_field.includes(field));
            return nameMatch && fieldMatch;
        });

        // סינון לפי כתובת ומרחק מקסימלי
        if (address && maxDistance) {
            try {
                const volunteersByDistance = await fetchVolunteersByAddressAndDistance(address, maxDistance);
                currentVolunteers = volunteersByDistance.filter(volunteer =>
                    currentVolunteers.some(v => v.id === volunteer.id)
                );
            } catch (error) {
                console.error('Error fetching volunteers by distance:', error);
            }
        }

        setFilteredVolunteers(currentVolunteers);
    };

    // פונקציה לניקוי המסננים
    const resetFilters = () => {
        setSearchTerm('');
        setSelectedFields([]);
        setAddress('');
        setMaxDistance('');
        setFilteredVolunteers(volunteers);  // מחזיר את הרשימה המלאה
    };

    return (
        <Box sx={{ p: 3 }}>
            <TextField label="חפש לפי שם" variant="outlined" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} sx={{ mb: 2 }} />
            <FormControl sx={{ mb: 3, minWidth: 200 }}>
                <InputLabel>סנן מתנדבים לפי תחום</InputLabel>
                <Select
                    multiple
                    value={selectedFields}
                    onChange={e => setSelectedFields(e.target.value)}
                    renderValue={selected => selected.join(', ')}
                >
                    {fields.map(field => (
                        <MenuItem key={field} value={field}>
                            <Checkbox checked={selectedFields.includes(field)} />
                            <ListItemText primary={field} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* מסנן כתובת ומרחק */}
            <TextField
                label="כתובת לחישוב מרחק"
                variant="outlined"
                value={address}
                onChange={e => setAddress(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="מרחק מקסימלי (מטרים)"
                variant="outlined"
                value={maxDistance}
                onChange={e => setMaxDistance(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={handleFilter} sx={{ mr: 2 }}>סנן</Button>
            <Button variant="outlined" onClick={resetFilters}>נקה מסננים</Button>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone</TableCell
                            ><TableCell>Address</TableCell>
                            <TableCell>Volunteer Field</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVolunteers.map(volunteer => (
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
