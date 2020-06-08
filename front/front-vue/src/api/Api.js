import axios from "axios";

export default axios.create({
  baseURL: "https://k02a3041.p.ssafy.io/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
