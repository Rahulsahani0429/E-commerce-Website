import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
  cancelOrder,
  updateOrderToProcessing,
  updateOrderToShipped,
  updateOrderStatus,
  updateOrderPayment,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/v1/admin/orders/:id/status").patch(protect, admin, updateOrderStatus);
router.route("/v1/admin/orders/:id/payment").patch(protect, admin, updateOrderPayment);
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/:id/process").put(protect, admin, updateOrderToProcessing);
router.route("/:id/ship").put(protect, admin, updateOrderToShipped);
router.route("/:id/cancel").put(protect, cancelOrder);

export default router;
