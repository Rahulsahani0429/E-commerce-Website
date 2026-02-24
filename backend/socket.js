import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
            socket.user = decoded;
            next();
        } catch (err) {
            console.error("Socket Auth Error:", err.message);
            next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        if (socket.user) {
            // Join user room
            socket.join(socket.user.id.toString());
            console.log(`User ${socket.user.id} joined their room`);

            // Join admin room if applicable
            if (socket.user.isAdmin) {
                socket.join("adminRoom");
                console.log(`Admin ${socket.user.id} joined adminRoom`);
            }

            // Listen for order details request
            socket.on("getOrderDetails", async (orderId) => {
                try {
                    const db = mongoose.connection.db;
                    const order = await db.collection("orders").findOne({ _id: new mongoose.Types.ObjectId(orderId) });

                    if (order) {
                        // Check ownership
                        if (order.user.toString() === socket.user.id.toString() || socket.user.isAdmin) {
                            socket.emit("orderDetailsResponse", { success: true, data: order });
                        } else {
                            socket.emit("orderDetailsResponse", { success: false, message: "Not authorized" });
                        }
                    } else {
                        socket.emit("orderDetailsResponse", { success: false, message: "Order not found" });
                    }
                } catch (error) {
                    console.error("Socket fetch order error:", error);
                    socket.emit("orderDetailsResponse", { success: false, message: "Server error" });
                }
            });

            // Join shipment room for live updates
            socket.on("joinShipmentRoom", (orderId) => {
                socket.join(`shipment_${orderId}`);
                console.log(`Socket ${socket.id} joined shipment room: shipment_${orderId}`);
            });
        }

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
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
