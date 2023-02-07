import axios from "axios";

// Creates an instance to use with Axios calls

const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-type": "application/json"
  }
});

export default instance;