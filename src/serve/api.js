import axios from "axios";

const token = localStorage.getItem("token");
const headers = { Authorization: "Bearer " + token };

const api = axios.create({
  baseURL: '//backoffice.driveranalytics.com.br/api', //process.env.VUE_APP_API_BASE_URL,
  headers,
});
export default api;
