import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.29.53:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default API;
