import { io } from "socket.io-client";

export const socket = io('https://localhost:3004/', {
  transports: ['websocket']
});