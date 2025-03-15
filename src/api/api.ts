import axios from "axios";

const api = axios.create({
  baseURL: "https://oishii-backend.fly.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
