import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie('token')
const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
});
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
axiosInstance.interceptors.request.use(
    function(config) {
        const accessToken = getCookie('token')
        // Do something before the request is sent
        // For example, add an authentication token to the headers
        const token = localStorage.getItem('authToken'); // Retrieve auth token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function(error) {
        // Handle the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
