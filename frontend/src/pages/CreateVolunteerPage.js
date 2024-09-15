// src/pages/CreateVolunteer.js
import React from 'react';
import VolunteerForm from '../components/VolunteerForm';
import { createVolunteer } from '../services/volunteersService';
import { useNavigate } from 'react-router-dom';

const CreateVolunteer = () => {
  const navigate = useNavigate();

  const handleSave = async (volunteer) => {
    try {
      await createVolunteer(volunteer);
      navigate('/volunteers');
    } catch (error) {
      console.error('Error creating volunteer:', error);
    }
  };

  return (
    <div>
      <h1>Create Volunteer</h1>
      <VolunteerForm onSave={handleSave} />
    </div>
  );
};

export default CreateVolunteer;
