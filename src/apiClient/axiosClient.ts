import axios from "axios";
// Set config defaults when creating the instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:3031/'
});
export default axiosClient;
