import axios from "axios";

const API = axios.create({
  baseURL: "https://tazkiya-store.onrender.com/api",
});

export default API;
