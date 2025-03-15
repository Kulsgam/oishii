import axios from "axios";

const api = axios.create({
  baseURL: "<backend_url>",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
