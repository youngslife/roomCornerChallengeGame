import axios from "axios";

export default axios.create({
  baseURL: "https://k02a3041.p.ssafy.io/api",
  // baseURL: "http://localhost:8081/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
