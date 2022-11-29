import axios from 'axios';

const api = axios.create({
  baseURL: 'https://adega.domqueshot.com:3000',
});

export default api;
