import mongoose from "mongoose";
import { getIO } from "../socket.js";

/**
 * @desc    Create and emit a notification
 */
export const createNotification = async ({ type, title, message, meta }) => {
    try {
        const db = mongoose.connection.db;

        const notification = {
            type,
            title,
            message,
            meta: meta || {},
            isRead: false,
            createdAt: new Date()
        };

        const result = await db.collection("notifications").insertOne(notification);
        const createdNotification = { ...notification, _id: result.insertedId };

        // Emit to all admins
        const io = getIO();
        io.to("admins").emit("notification:new", createdNotification);

        return createdNotification;
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};
