import axios from "axios";

const token = localStorage.getItem("token");
const headers = { Authorization: "Bearer " + token };

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers,
});
export default api;
