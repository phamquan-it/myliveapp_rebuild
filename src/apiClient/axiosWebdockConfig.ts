import axios from "axios";
import { getCookie } from "cookies-next";
import { WEBDOCK_TOKEN } from "../../WEBDOCK_PROVIDER/constant/Token";
const token = getCookie('token')
const axiosWebdock = axios.create({
    baseURL: process.env.WEBDOCK_URL,
});
axiosWebdock.defaults.headers.common['Authorization'] = `Bearer ${WEBDOCK_TOKEN}`
export default axiosWebdock;
