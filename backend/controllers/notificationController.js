import mongoose from "mongoose";
import { ObjectId } from "mongodb";

/**
 * @desc    Get admin notifications with filters and pagination
 * @route   GET /api/notifications/admin
 * @access  Private/Admin
 */
const getAdminNotifications = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const db = mongoose.connection.db;

        const query = {};
        if (status === "unread") {
            query.isRead = false;
        } else if (status === "read") {
            query.isRead = true;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const notifications = await db.collection("notifications")
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();

        const total = await db.collection("notifications").countDocuments(query);
        const unreadCount = await db.collection("notifications").countDocuments({ isRead: false });

        res.json({
            items: notifications,
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            unreadCount
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
        const { page = 1, limit = 20 } = req.query;
        const db = mongoose.connection.db;

        // Query: specifically for this user OR broadcasted to all users
        const query = {
            $or: [
                { recipient: new mongoose.Types.ObjectId(req.user._id) },
                { role: "user", recipient: null }
            ]
        };

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const notifications = await db.collection("notifications")
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();

        const total = await db.collection("notifications").countDocuments(query);
        const unreadCount = await db.collection("notifications").countDocuments({ ...query, isRead: false });

        res.json({
            items: notifications,
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            unreadCount
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

export {
    getAdminNotifications,
    getUserNotifications,
    markAsRead,
    markAllRead
};
