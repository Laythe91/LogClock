/*import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://ton-backend-springboot.com/api',
  headers: { 'Content-Type': 'application/json' }
});*/

// AXIOS OU RTK QUERY
// src/api/axiosClient.ts
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://your-api.com",
  timeout: 10000,
});
