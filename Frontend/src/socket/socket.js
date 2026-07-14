import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const connectSocket = () => {
  if (!socket.connected && !socket.active) {
    socket.connect();
  }
  return socket;
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;