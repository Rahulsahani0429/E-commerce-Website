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
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items provided" });
        }

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
        const createdOrder = await order.save();

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
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
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

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer?.email_address,
        };

        const updatedOrder = await order.save();

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
        const orders = await Order.find({}).populate("user", "id name");

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Get Orders Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
};
