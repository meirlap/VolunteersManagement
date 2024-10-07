import axios from 'axios';
import { apiBaseUrl } from '../utils/config';

const API_URL = `${apiBaseUrl}/api/needs`;
// פונקציה לשליפת הצרכים מהשרת
export const fetchNeeds = async () => {
  try {
    const response = await axios.get(API_URL); 
    return response.data;
  } catch (error) {
    console.error('Error fetching needs:', error);
    throw error;
  }
};
