import express from "express";
import {
    getUserNotifications,
    getAdminNotifications,
    markAsRead,
} from "../controllers/notificationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.route("/").get(protect, getUserNotifications);
router.route("/:id/read").put(protect, markAsRead);

// Admin Routes
router.route("/admin").get(protect, admin, getAdminNotifications);
router.route("/admin/:id/read").put(protect, admin, markAsRead);

export default router;
