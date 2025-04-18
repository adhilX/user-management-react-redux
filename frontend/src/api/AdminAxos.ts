import axios from 'axios';
import {store} from '../store/store';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().adminToken.token;
  // const token = localStorage.getItem('adminToken')

//   console.log('axoissssssssssss',token)
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default axiosInstance;
