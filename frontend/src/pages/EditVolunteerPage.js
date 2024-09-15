// src/pages/EditVolunteerPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VolunteerForm from '../components/VolunteerForm';
import { getVolunteer, updateVolunteer } from '../services/volunteersService';

const EditVolunteerPage = () => {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVolunteer();
  }, []);

  const fetchVolunteer = async () => {
    try {
      const response = await getVolunteer(id);
      setVolunteer(response.data);
    } catch (error) {
      console.error('Error fetching volunteer:', error);
    }
  };

  const handleSave = async (updatedVolunteer) => {
    try {
      await updateVolunteer(id, updatedVolunteer);
      navigate('/volunteers');
    } catch (error) {
      console.error('Error updating volunteer:', error);
    }
  };

  return (
    <div>
      <h1>Edit Volunteer</h1>
      {volunteer && <VolunteerForm volunteer={volunteer} onSave={handleSave} />}
    </div>
  );
};

export default EditVolunteerPage;
