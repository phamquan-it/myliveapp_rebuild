import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie('token')
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
      "Authorization": `Bearer ${token}`
  }
});

export default axiosInstance;
