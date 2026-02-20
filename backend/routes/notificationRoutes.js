import express from "express";
import {
    getAdminNotifications,
    markAsRead,
    markAllRead,
} from "../controllers/notificationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/admin").get(protect, admin, getAdminNotifications);
router.route("/read-all").patch(protect, admin, markAllRead);
router.route("/:id/read").patch(protect, admin, markAsRead);

export default router;
