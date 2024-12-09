import axios from "axios";
let adminUrl = "https://api.coingecko.com/api/v3/coins";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
  baseURL,
});
export default axiosInstance;
