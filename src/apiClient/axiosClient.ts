import axios from "axios";
// Set config defaults when creating the instance
const axiosClient = axios.create({
  baseURL: 'https://api.golive365.top/'
});
export default axiosClient;
