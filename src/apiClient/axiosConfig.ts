import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie('token')
const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
});
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from the cookies
        const token = getCookie('token');
        // If token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default axiosInstance;
