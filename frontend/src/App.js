// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VolunteersPage from './pages/VolunteersPage';
import VolunteersManagementPage from './pages/VolunteersManagementPage';
import NeedsPage from './pages/NeedsPage';
import CreateVolunteerPage from './pages/CreateVolunteerPage';
import EditVolunteerPage from './pages/EditVolunteerPage';
import CreateNeedPage from './pages/CreateNeedPage';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/volunteers">View Volunteers</Button>
            <Button color="inherit" component={Link} to="/volunteers-management">Manage Volunteers</Button>
            <Button color="inherit" component={Link} to="/needs">View Needs</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/volunteers" element={<VolunteersPage />} />
            <Route path="/volunteers-management" element={<VolunteersManagementPage />} />
            <Route path="/needs" element={<NeedsPage />} />
            <Route path="/create-volunteer" element={<CreateVolunteerPage />} />
            <Route path="/edit-volunteer/:id" element={<EditVolunteerPage />} />
            <Route path="/create-need" element={<CreateNeedPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
