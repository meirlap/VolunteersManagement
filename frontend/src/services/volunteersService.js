import axios from 'axios';
import { apiBaseUrl } from '../utils/config';

const API_URL = `${apiBaseUrl}/api/volunteers`;

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

export const fetchVolunteerFields = async () => {
  try {
    const response = await axios.get(`${API_URL}/fields`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer fields:', error);
    throw error;
  }
};

// הוספת הפונקציה ליצירת מתנדב חדש
export const createVolunteer = async (volunteerData) => {
  const response = await axios.post(`${apiBaseUrl}/api/volunteers`, volunteerData);
  return response.data;
};

// הוספת הפונקציה לשליפת מתנדב לפי מזהה
export const getVolunteer = async (id) => {
  const response = await axios.get(`${apiBaseUrl}/api/volunteers/${id}`);
  return response.data;
};
