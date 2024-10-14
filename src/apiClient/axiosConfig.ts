import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie('token')
const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
});
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`


export default axiosInstance;
