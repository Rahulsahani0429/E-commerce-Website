import { getDashboardStats, getCustomers, getReports, getAdminStats } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/dashboard").get(protect, admin, getDashboardStats);
router.route("/customers").get(protect, admin, getCustomers);
router.route("/reports").get(protect, admin, getReports);
router.route("/stats").get(protect, admin, getAdminStats);

export default router;
