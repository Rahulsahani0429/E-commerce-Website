import { getDashboardStats, getCustomers, getReports, getAdminStats, updateUserByAdmin, deleteUserByAdmin } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

import {
    getPaymentDetails,
    updatePayment,
    generateReceipt,
    sendReceipt,
    refundPayment,
    deletePayment
} from "../controllers/paymentController.js";

router.route("/dashboard").get(protect, admin, getDashboardStats);
router.route("/customers").get(protect, admin, getCustomers);
router.route("/customers/:id")
    .put(protect, admin, updateUserByAdmin)
    .delete(protect, admin, deleteUserByAdmin);
router.route("/reports").get(protect, admin, getReports);
router.route("/stats").get(protect, admin, getAdminStats);

// Payment Routes
router.route("/payments/:id")
    .get(protect, admin, getPaymentDetails)
    .put(protect, admin, updatePayment)
    .delete(protect, admin, deletePayment);

router.route("/payments/:id/receipt").get(protect, admin, generateReceipt);
router.route("/payments/:id/send-receipt").post(protect, admin, sendReceipt);
router.route("/payments/:id/refund").post(protect, admin, refundPayment);

export default router;
