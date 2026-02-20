import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            console.error("Socket Auth: No token provided");
            return next(new Error("Authentication error"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // For backward compatibility or extra security, we can check DB
            // But if isAdmin is in token, we trust it for now
            if (decoded.isAdmin) {
                socket.user = decoded;
                return next();
            }

            // Fallback: Fetch from DB if isAdmin not in token
            const { default: User } = await import("./models/User.js");
            const user = await User.findById(decoded.id);
            if (user && user.isAdmin) {
                socket.user = { id: user._id, isAdmin: true };
                next();
            } else {
                console.error(`Socket Auth: User ${decoded.id} is not an admin`);
                next(new Error("Admin access required"));
            }
        } catch (err) {
            console.error("Socket Auth Error:", err.message);
            next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log(`Admin connected: ${socket.id}`);
        socket.join("admins");

        socket.on("disconnect", () => {
            console.log(`Admin disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
