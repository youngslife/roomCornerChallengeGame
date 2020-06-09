import axios from "axios";

export default axios.create({
  baseURL: "https://us-central1-lastproj-c9acb.cloudfunctions.net/app",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
