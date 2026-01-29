
import axios from 'axios';

// During deployment on Vercel/Netlify, the app will use its internal mock fallback 
// because http://localhost:8080 will obviously not be reachable.
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
