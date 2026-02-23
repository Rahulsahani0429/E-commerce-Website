import mongoose from "mongoose";
import { getIO } from "../socket.js";

/**
 * @desc    Create and emit a notification
 */
export const createNotification = async ({ type, title, message, meta, recipient, role, relatedId }) => {
    try {
        const db = mongoose.connection.db;

        const notification = {
            type,
            title,
            message,
            meta: meta || {},
            recipient: recipient ? new mongoose.Types.ObjectId(recipient) : null,
            role: role || "admin",
            relatedId: relatedId ? new mongoose.Types.ObjectId(relatedId) : null,
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
