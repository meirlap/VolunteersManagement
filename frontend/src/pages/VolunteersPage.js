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

    useEffect(() => {
        handleFilter();
    }, [searchTerm, selectedFields, address, maxDistance]);

    const handleFilter = async () => {
        let currentVolunteers = [...volunteers];

        currentVolunteers = currentVolunteers.filter(volunteer => {
            const nameMatch = volunteer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || volunteer.last_name.toLowerCase().includes(searchTerm.toLowerCase());
            const fieldMatch = selectedFields.length === 0 || selectedFields.some(field => volunteer.volunteer_field.includes(field));
            return nameMatch && fieldMatch;
        });

        if (address && maxDistance) {
            try {
                const volunteersByDistance = await fetchVolunteersByAddressAndDistance(address, maxDistance);
                currentVolunteers = volunteersByDistance.filter(volunteer =>
                    currentVolunteers.some(v => v.id === volunteer.id)
                );
            } catch (error) {
                console.error('שגיאה בטעינת מתנדבים לפי מרחק:', error);
            }
        }

        setFilteredVolunteers(currentVolunteers);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedFields([]);
        setAddress('');
        setMaxDistance('');
        setFilteredVolunteers(volunteers);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <TextField 
                    label="חיפוש לפי שם" 
                    variant="outlined" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    sx={{ flexGrow: 1, minWidth: '200px' }}
                />
                <FormControl sx={{ flexGrow: 1, minWidth: '200px' }}>
                    <InputLabel>סינון לפי תחום התנדבות</InputLabel>
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
                <TextField
                    label="כתובת לחישוב מרחק"
                    variant="outlined"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    sx={{ flexGrow: 1, minWidth: '200px' }}
                />
                <TextField
                    label="מרחק מקסימלי (מטרים)"
                    variant="outlined"
                    type="number"
                    value={maxDistance}
                    onChange={e => setMaxDistance(e.target.value)}
                    sx={{ flexGrow: 1, minWidth: '200px' }}
                />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button variant="contained" onClick={handleFilter} sx={{ flexGrow: 1 }}>סינון</Button>
                <Button variant="outlined" onClick={resetFilters} sx={{ flexGrow: 1 }}>איפוס מסננים</Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                            <TableCell>שם פרטי</TableCell>
                            <TableCell>שם משפחה</TableCell>
                            <TableCell>טלפון</TableCell>
                            <TableCell>כתובת</TableCell>
                            <TableCell>תחום התנדבות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVolunteers.map(volunteer => (
                            <TableRow key={volunteer.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
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