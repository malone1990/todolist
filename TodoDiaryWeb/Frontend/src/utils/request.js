import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // || 'http://localhost:5000/api', // .NET后端地址
  timeout: 5000
});

export default request;