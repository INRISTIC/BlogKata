import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api',
});
instance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
    return config;
  }
  return config;
});

export default instance;
