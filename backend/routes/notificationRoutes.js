import express from "express";
import {
    getAdminNotifications,
    getUserNotifications,
    markAsRead,
    markAllRead,
    sendNotification,
} from "../controllers/notificationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUserNotifications);
router.route("/admin").get(protect, admin, getAdminNotifications);
router.route("/send").post(protect, admin, sendNotification);
router.route("/read-all").patch(protect, markAllRead);
router.route("/:id/read").patch(protect, markAsRead);

export default router;
