import mongoose from "mongoose";
import { ObjectId } from "mongodb";

/**
 * @desc    Get admin notifications with filters and pagination
 * @route   GET /api/notifications/admin
 * @access  Private/Admin
 */
const getAdminNotifications = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const db = mongoose.connection.db;

        const query = {};
        if (status === "unread") {
            query.isRead = false;
        } else if (status === "read") {
            query.isRead = true;
        }

        const p = Math.max(1, parseInt(page));
        const l = Math.max(1, parseInt(limit));
        const skip = (p - 1) * l;

        const notifications = await db.collection("notifications")
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(l)
            .toArray();

        const totalNotifications = await db.collection("notifications").countDocuments(query);
        const unreadCount = await db.collection("notifications").countDocuments({ isRead: false });
        const totalPages = Math.ceil(totalNotifications / l);
        const hasMore = p < totalPages;

        res.json({
            notifications,
            currentPage: p,
            totalPages,
            totalNotifications,
            unreadCount,
            hasMore
        });
    } catch (error) {
        console.error("Get Notifications Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Get user notifications
 * @route   GET /api/notifications
 * @access  Private
 */
const getUserNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const db = mongoose.connection.db;

        // Query: specifically for this user OR broadcasted to all users
        const query = {
            $or: [
                { recipient: new mongoose.Types.ObjectId(req.user._id) },
                { role: "user", recipient: null }
            ]
        };

        const p = Math.max(1, parseInt(page));
        const l = Math.max(1, parseInt(limit));
        const skip = (p - 1) * l;

        const notifications = await db.collection("notifications")
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(l)
            .toArray();

        const totalNotifications = await db.collection("notifications").countDocuments(query);
        const unreadCount = await db.collection("notifications").countDocuments({ ...query, isRead: false });
        const totalPages = Math.ceil(totalNotifications / l);
        const hasMore = p < totalPages;

        res.json({
            notifications,
            currentPage: p,
            totalPages,
            totalNotifications,
            unreadCount,
            hasMore
        });
    } catch (error) {
        console.error("Get User Notifications Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Mark single notification as read
 * @route   PATCH /api/notifications/:id/read
 * @access  Private/Admin
 */
const markAsRead = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const query = { _id: new ObjectId(req.params.id) };

        // If not admin, ensure they own the notification
        if (!req.user.isAdmin) {
            query.recipient = new mongoose.Types.ObjectId(req.user._id);
        }

        const result = await db.collection("notifications").updateOne(
            query,
            { $set: { isRead: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Mark Read Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Mark all notifications as read
 * @route   PATCH /api/notifications/read-all
 * @access  Private/Admin
 */
const markAllRead = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const query = { isRead: false };

        // If not admin, only mark their own as read
        if (!req.user.isAdmin) {
            query.recipient = new mongoose.Types.ObjectId(req.user._id);
        }

        await db.collection("notifications").updateMany(
            query,
            { $set: { isRead: true } }
        );

        res.json({ message: "All notifications marked as read" });
    } catch (error) {
        console.error("Mark All Read Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Admin sends a notification to a user or broadcasts to all users
 * @route   POST /api/notifications/send
 * @access  Private/Admin
 */
const sendNotification = async (req, res) => {
    try {
        const { title, message, type = "system", recipientId = null } = req.body;
        const db = mongoose.connection.db;

        if (!title || !message) {
            return res.status(400).json({ message: "Title and message are required" });
        }

        const notif = {
            title,
            message,
            type,
            role: "user",
            recipient: recipientId ? new mongoose.Types.ObjectId(recipientId) : null,
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("notifications").insertOne(notif);
        const saved = { ...notif, _id: result.insertedId };

        // Emit via socket if available
        const io = req.app.get("io");
        if (io) {
            if (recipientId) {
                io.to(`user_${recipientId}`).emit("notification:new", saved);
            } else {
                io.emit("notification:new", saved);
            }
        }

        res.status(201).json({ message: "Notification sent", notification: saved });
    } catch (error) {
        console.error("Send Notification Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    getAdminNotifications,
    getUserNotifications,
    markAsRead,
    markAllRead,
    sendNotification
};
