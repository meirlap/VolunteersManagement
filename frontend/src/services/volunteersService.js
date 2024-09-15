// src/services/volunteersService.js
import axios from 'axios';
import { apiBaseUrl } from '../utils/config';

const API_URL = '/api/volunteers';

export const fetchVolunteers = async (filters) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    throw error;
  }
};
export const addVolunteer = async (volunteerData) => {
  const response = await axios.post(`${apiBaseUrl}/api/volunteers`, volunteerData);
  return response.data;
};

export const updateVolunteer = async (volunteerData) => {
  const response = await axios.put(`${apiBaseUrl}/api/volunteers/${volunteerData.id}`, volunteerData);
  return response.data;
};

export const deleteVolunteer = async (id) => {
  const response = await axios.delete(`${apiBaseUrl}/api/volunteers/${id}`);
  return response.data;
};


