import axios from 'axios';

// פונקציה לשליפת הצרכים מהשרת
export const fetchNeeds = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/needs'); // עדכן את ה-URL בהתאם לראוטים שלך בשרת
    return response.data;
  } catch (error) {
    console.error('Error fetching needs:', error);
    throw error;
  }
};
