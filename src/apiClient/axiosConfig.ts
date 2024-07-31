import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.golive365.top'
});

export default axiosInstance;
