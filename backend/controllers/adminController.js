import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const revenueData = await Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        const recentOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "name email");

        return res.status(200).json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue,
            recentOrders
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { getDashboardStats };
