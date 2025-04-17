import axios from 'axios';
import store from '../store/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().adminToken.token;
//   console.log('axoissssssssssss',token)
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default axiosInstance;
