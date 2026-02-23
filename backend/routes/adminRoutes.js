import { getDashboardStats, getCustomers, getReports, getAdminStats, updateUserByAdmin, deleteUserByAdmin } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/dashboard").get(protect, admin, getDashboardStats);
router.route("/customers").get(protect, admin, getCustomers);
router.route("/customers/:id")
    .put(protect, admin, updateUserByAdmin)
    .delete(protect, admin, deleteUserByAdmin);
router.route("/reports").get(protect, admin, getReports);
router.route("/stats").get(protect, admin, getAdminStats);

export default router;
