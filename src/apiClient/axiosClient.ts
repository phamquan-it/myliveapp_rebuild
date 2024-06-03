import axios from "axios";
// Set config defaults when creating the instance
const axiosClient = axios.create({
  baseURL: 'https://devbe.azseo.net'
});
export default axiosClient;
