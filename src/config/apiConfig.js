import axios from "axios";
import { backendUrl } from './appConfig';

// Create Axios Instance
const axiosInstance = axios.create({
  baseURL: backendUrl, // Default API Base URL (Change as needed)
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Access-Control-Allow-Origin": "*",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); // Fetch token from storage
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response');
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Dynamic GET Request
export const getRequest = async (url, params = {}, customHeaders = {
    "Content-Type": "application/json"
  }) => {
  try {
    const response = await axiosInstance.get(url, { params }, {
      headers: {
        ...customHeaders,
      }});
    return response.data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
    throw error;
  }
};

// Dynamic POST Request
export const postRequest = async (url, data = {}, customHeaders = {
    "Content-Type": "application/json"
  }) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        ...customHeaders,
      }});
    return response.data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

// Dynamic DELETE Request
export const deleteRequest = async (url, params = {}, customHeaders = {
    "Content-Type": "application/json"
  }) => {
  try {
    const response = await axiosInstance.delete(url, { params }, {
      headers: {
        ...customHeaders,
      }});
    return response.data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
    throw error;
  }
};

export const dataTableApi = (url, page = 0, perPage = 10, searchQuery = "") => {
    return axios.get(url, {
        params: {
          _page: page,
          _limit: perPage,
          q: searchQuery, // Mocked search functionality
        },
      });
  };
