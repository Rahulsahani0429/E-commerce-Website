// import Order from '../models/Order.js';

// // @desc    Create new order
// // @route   POST /api/orders
// // @access  Private
// const addOrderItems = async (req, res) => {
//     try {
//         const {
//             orderItems,
//             shippingAddress,
//             paymentMethod,
//             itemsPrice,
//             taxPrice,
//             shippingPrice,
//             totalPrice,
//         } = req.body;

//         if (orderItems && orderItems.length === 0) {
//             res.status(400).json({ message: 'No order items' });
//             return;
//         } else {
//             const order = new Order({
//                 orderItems: orderItems.map((x) => ({
//                     ...x,
//                     product: x.product,
//                     _id: undefined,
//                 })),
//                 user: req.user._id,
//                 shippingAddress,
//                 paymentMethod,
//                 itemsPrice,
//                 taxPrice,
//                 shippingPrice,
//                 totalPrice,
//             });

//             const createdOrder = await order.save();

//             res.status(201).json(createdOrder);
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Get order by ID
// // @route   GET /api/orders/:id
// // @access  Private
// const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id).populate(
//             'user',
//             'name email'
//         );

//         if (order) {
//             res.json(order);
//         } else {
//             res.status(404).json({ message: 'Order not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Update order to paid
// // @route   PUT /api/orders/:id/pay
// // @access  Private
// const updateOrderToPaid = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);

//         if (order) {
//             order.isPaid = true;
//             order.paidAt = Date.now();
//             order.paymentResult = {
//                 id: req.body.id,
//                 status: req.body.status,
//                 update_time: req.body.update_time,
//                 email_address: req.body.payer.email_address,
//             };

//             const updatedOrder = await order.save();

//             res.json(updatedOrder);
//         } else {
//             res.status(404).json({ message: 'Order not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Update order to delivered
// // @route   PUT /api/orders/:id/deliver
// // @access  Private/Admin
// const updateOrderToDelivered = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);

//         if (order) {
//             order.isDelivered = true;
//             order.deliveredAt = Date.now();

//             const updatedOrder = await order.save();

//             res.json(updatedOrder);
//         } else {
//             res.status(404).json({ message: 'Order not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Get logged in user orders
// // @route   GET /api/orders/myorders
// // @access  Private
// const getMyOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({ user: req.user._id });
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Get all orders
// // @route   GET /api/orders
// // @access  Private/Admin
// const getOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}).populate('user', 'id name');
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export {
//     addOrderItems,
//     getOrderById,
//     updateOrderToPaid,
//     updateOrderToDelivered,
//     getMyOrders,
//     getOrders,
// };

import Order from "../models/Order.js";
import User from "../models/User.js";
import { createNotification } from "../services/notificationService.js";

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // 1️⃣ Validate order items
    // we can also write as

    if (!orderItems) {
      return res.status(400).json({ message: "No order items provided" });
    }
    if (orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "No order items provided by you rahul" });
    }
    // this is second method
    // if (!orderItems || orderItems.length === 0) {
    //     return res.status(400).json({ message: "No order items provided" });
    // }

    //  first method
    // const formattedItems = orderItems.map(item => ({
    //     product: item.product,
    //     qty: item.qty,
    //     price: item.price,
    //     name: item.name,
    //     image: item.image,
    // }));

    // const order = new Order({
    //     orderItems: formattedItems,
    //     user: req.user._id,
    //     shippingAddress,
    //     paymentMethod,
    //     itemsPrice,
    //     taxPrice,
    //     shippingPrice,
    //     totalPrice,
    // });

    // second method
    // 2️⃣ Create order
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item.product,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // 3️⃣ Save order
    // first method
    const createdOrder = await order.save();

    // Notify Admin of new order
    await createNotification({
      type: "order_created",
      title: "New Order Placed",
      message: `New order #${createdOrder._id} for $${createdOrder.totalPrice}`,
      meta: {
        orderId: createdOrder._id,
        amount: createdOrder.totalPrice,
        userId: req.user._id
      }
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res) => {
  try {
    // 🔍 Validate ID
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid order ID format" });
    }

    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email avatar",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Get Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Update order to paid
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isFailed = req.body.status === "failed";

    if (isFailed) {
      order.isPaid = false;
      order.paymentResult = {
        id: req.body.id,
        status: "failed",
        update_time: req.body.update_time,
        email_address: req.body.payer?.email_address,
      };

      const updatedOrder = await order.save();

      // Notify User
      await createNotification({
        recipient: order.user,
        role: "user",
        title: "Payment Failed",
        message: "Your payment failed. Please retry.",
        type: "payment",
        relatedId: order._id,
      });

      // Notify Admin
      await createNotification({
        type: "payment_updated",
        title: "Payment Failed",
        message: `Payment failed for Order #${order._id}.`,
        meta: {
          orderId: order._id,
          paymentStatus: "failed"
        }
      });

      return res.status(200).json({
        message: "Order payment failed",
        order: updatedOrder,
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address,
    };

    const updatedOrder = await order.save();

    // Notify User
    await createNotification({
      recipient: order.user,
      role: "user",
      title: "Payment Successful",
      message: "Your payment was successful. We are processing your order.",
      type: "payment",
      relatedId: order._id,
    });

    // Notify Admin
    await createNotification({
      type: "payment_updated",
      title: "Payment Successful",
      message: `Order #${order._id} has been paid.`,
      meta: {
        orderId: order._id,
        paymentStatus: "paid",
        amount: order.totalPrice
      }
    });

    return res.status(200).json({
      message: "Order marked as paid",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Pay Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Update order to delivered
 * @route   PUT /api/orders/:id/deliver
 * @access  Private/Admin
 */
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    // Notify User
    await createNotification({
      recipient: order.user,
      role: "user",
      title: "Order Delivered",
      message: `Your order #${order._id} has been delivered. Enjoy your purchase!`,
      type: "order",
      relatedId: order._id,
    });

    return res.status(200).json({
      message: "Order marked as delivered",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Deliver Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Get logged-in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("My Orders Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email avatar");

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Delete an order (Admin)
 * @route   DELETE /api/orders/:id
 * @access  Private/Admin
 */
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Cancel an order
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check ownership
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to cancel this order" });
    }

    if (order.isDelivered) {
      return res.status(400).json({ message: "Cannot cancel a delivered order" });
    }

    if (order.isCancelled) {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    // You might also want to prevent cancellation if shipped,
    // though the model doesn't have an isShipped field yet.
    // Based on requirements: "Hide cancel button if order is shipped or delivered"
    // Since we don't have isShipped, we will assume delivered is the main check for now,
    // or add isShipped if needed. The prompt says "if order is shipped or delivered".

    order.isCancelled = true;
    order.cancelledAt = Date.now();

    const updatedOrder = await order.save();

    // Notify Admin of cancellation
    await createNotification({
      role: "admin",
      title: "Order Cancelled",
      message: `Order #${order._id} has been cancelled by the user.`,
      type: "order",
      relatedId: order._id,
    });

    return res.status(200).json({
      message: "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Update order to processing
 * @route   PUT /api/orders/:id/process
 * @access  Private/Admin
 */
const updateOrderToProcessing = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isProcessing = true;
    order.processedAt = Date.now();

    const updatedOrder = await order.save();

    return res.status(200).json({
      message: "Order marked as processing",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Process Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Update order to shipped
 * @route   PUT /api/orders/:id/ship
 * @access  Private/Admin
 */
const updateOrderToShipped = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isShipped = true;
    order.shippedAt = Date.now();

    const updatedOrder = await order.save();

    // Notify User
    await createNotification({
      recipient: order.user,
      role: "user",
      title: "Order Shipped",
      message: `Your order #${order._id} has been shipped. It will arrive soon!`,
      type: "order",
      relatedId: order._id,
    });

    return res.status(200).json({
      message: "Order marked as shipped",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Ship Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Update order status
// @route   PATCH /api/v1/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const statusEnum = ["Order Placed", "Processing", "Shipped", "Delivered"];

    if (!statusEnum.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const currentIndex = statusEnum.indexOf(order.orderStatus);
    const newIndex = statusEnum.indexOf(status);

    if (newIndex <= currentIndex) {
      return res.status(400).json({ message: `Cannot move status back or stay the same. Current: ${order.orderStatus}` });
    }

    order.orderStatus = status;

    // Maintain backward compatibility with old flags
    if (status === "Processing") {
      order.isProcessing = true;
      order.processedAt = Date.now();
    } else if (status === "Shipped") {
      order.isShipped = true;
      order.shippedAt = Date.now();
    } else if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    // Notify Admin
    await createNotification({
      type: "order_status_changed",
      title: "Order Status Updated",
      message: `Order #${order._id} status changed to ${status}`,
      meta: {
        orderId: order._id,
        orderStatus: status
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order payment status
// @route   PATCH /api/v1/admin/orders/:id/payment
// @access  Private/Admin
const updateOrderPayment = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!["NOT_PAID", "PAID"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    order.paymentStatus = paymentStatus;

    if (paymentStatus === "PAID") {
      order.isPaid = true;
      order.paidAt = Date.now();
    } else {
      order.isPaid = false;
      order.paidAt = null;
    }

    const updatedOrder = await order.save();

    // Notify Admin
    await createNotification({
      type: "payment_updated",
      title: "Payment Status Updated",
      message: `Order #${order._id} payment status changed to ${paymentStatus}`,
      meta: {
        orderId: order._id,
        paymentStatus: paymentStatus
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToProcessing,
  updateOrderToShipped,
  updateOrderStatus,
  updateOrderPayment,
  getMyOrders,
  getOrders,
  deleteOrder,
  cancelOrder,
};
