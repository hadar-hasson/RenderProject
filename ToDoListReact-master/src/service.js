import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

export const getTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};


axios.defaults.baseURL = API_URL;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error: ', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  // קריאה לקבלת כל המשימות
  getTasks: async () => {
    const result = await axios.get(`${API_URL}/items`);
    return result.data;
  },

  // קריאה להוספת משימה חדשה
  addTask: async (name) => {
    try {
      const task = { name, isComplete: false }; // ברירת מחדל, המשימה לא הושלמה
      const result = await axios.post(`${API_URL}/items`, task);
      return result.data;
    } catch (error) {
      console.error("Error adding task: ", error);
      return null;
    }
  },

  // קריאה לעדכון מצב המשימה (לסמן כ-Complete או לא)
  setCompleted: async (id, isComplete) => {
    try {
      const updatedTask = { isComplete };
      const result = await axios.put(`${API_URL}/items/${id}`, updatedTask);
      return result.data;
    } catch (error) {
      console.error("Error updating task completion: ", error);
      return null;
    }
  },

  // קריאה למחיקת משימה
  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      return { message: "Task deleted successfully!" };
    } catch (error) {
      console.error("Error deleting task: ", error);
      return null;
    }
  }
};
