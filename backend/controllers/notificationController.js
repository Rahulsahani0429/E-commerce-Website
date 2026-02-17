import Notification from "../models/Notification.js";

/**
 * @desc    Get user notifications
 * @route   GET /api/notifications
 * @access  Private
 */
const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user._id,
            role: "user",
        }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get admin notifications
 * @route   GET /api/admin/notifications
 * @access  Private/Admin
 */
const getAdminNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            role: "admin",
        }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Mark notification as read
 * @route   PUT /api/notifications/:id/read
 * @access  Private
 */
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (notification) {
            notification.isRead = true;
            await notification.save();
            res.json({ message: "Notification marked as read" });
        } else {
            res.status(404).json({ message: "Notification not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Helper to create notification
 */
const createNotification = async ({ recipient, role, title, message, type, relatedId }) => {
    try {
        const notification = new Notification({
            recipient,
            role,
            title,
            message,
            type,
            relatedId,
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

export {
    getUserNotifications,
    getAdminNotifications,
    markAsRead,
    createNotification,
};
