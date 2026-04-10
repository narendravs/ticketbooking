import axios from "axios";

// This pulls from your .env file
const BASE_URL =
  process.env.REACT_APP_API_URL_LOCAL || "http://localhost:8000/api";

const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default publicRequest;
