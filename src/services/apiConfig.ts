import axios from 'axios';
import Config from 'react-native-config';

const API = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default API;
