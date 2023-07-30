import { create } from "axios";

export const api = create({
  baseURL: "https://localhost:3004/v1",
  mode: "cors",
  cache: "no-cache",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  referrerPolicy: "origin",
});
