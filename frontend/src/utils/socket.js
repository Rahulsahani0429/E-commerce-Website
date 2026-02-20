import { io } from "socket.io-client";
import { API_BASE_URL } from "../config";

let socket;

export const connectSocket = (token) => {
    if (socket) return socket;

    socket = io(API_BASE_URL, {
        auth: { token },
        transports: ["websocket", "polling"]
    });

    socket.on("connect", () => {
        console.log("Connected to notification server");
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
    });

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => socket;
