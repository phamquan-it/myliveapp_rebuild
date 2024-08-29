import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie('token')
const axiosInstance = axios.create({
  baseURL: 'https://api.golive365.top',
  headers: {
      "Authorization": `Bearer ${token}`
  }
});

export default axiosInstance;
