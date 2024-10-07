import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Button } from '@mui/material';
import axios from 'axios';
import { fetchVolunteers, deleteVolunteer } from '../services/volunteersService';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../utils/config';

const VolunteersManagementPage = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // פונקציית fetchData כעת מוגדרת ברמה של הקומפוננטה כולה
    const fetchData = async () => {
        const result = await fetchVolunteers();
        setVolunteers(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
            alert('Please upload an Excel file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        axios.post(`${apiBaseUrl}/api/upload_volunteers`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert('File uploaded successfully');
            fetchData();  // Refresh the volunteers list
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            <TextField
                label="Search by name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
            />
            <input type="file" onChange={handleFileUpload} style={{ display: 'block', marginBottom: 20 }} />
            <Button variant="contained" component="span">
                Upload
            </Button>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {volunteers.map(volunteer => (
                            <TableRow key={volunteer.id}>
                                <TableCell>{volunteer.first_name}</TableCell>
                                <TableCell>{volunteer.last_name}</TableCell>
                                <TableCell>{volunteer.phone}</TableCell>
                                <TableCell>{volunteer.address}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => navigate(`/edit-volunteer/${volunteer.id}`)}>
                                        Edit
                                    </Button>
                                    <Button color="secondary" onClick={() => deleteVolunteer(volunteer.id).then(fetchData)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default VolunteersManagementPage;
