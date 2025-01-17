import axios from 'axios';

const api = axios.create({
  baseURL: 'https://event-management-platform-388u.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
