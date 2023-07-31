import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:3004/v1",
  mode: "cors",
  cache: "no-cache",
  withCredentials: true,
  referrerPolicy: "origin",
  headers: {
    "Content-Type": "application/json",
  },
});
