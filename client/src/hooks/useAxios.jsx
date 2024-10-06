import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '../Redux/slices/loading-slice';

export const useAxios = () => {
  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  });

  // Request interceptor to show loading screen
  axiosInstance.interceptors.request.use(
    (config) => {
      dispatch(setLoading(true));
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor to hide loading screen
  axiosInstance.interceptors.response.use(
    (response) => {
      dispatch(setLoading(false));
      return response;
    },
    (error) => {
      dispatch(setLoading(false));
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};