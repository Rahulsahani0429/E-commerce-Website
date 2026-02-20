// import Product from '../models/Product.js';

// // @desc    Fetch all products
// // @route   GET /api/products
// // @access  Public
// const getProducts = async (req, res) => {
//     try {
//         const query = {};

//         if (req.query.keyword) {
//             query.name = {
//                 $regex: req.query.keyword,
//                 $options: 'i',
//             };
//         }

//         if (req.query.category) {
//             query.category = req.query.category;
//         }

//         if (req.query.minPrice || req.query.maxPrice) {
//             query.price = {};
//             if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
//             if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
//         }

//         if (req.query.isFeatured) {
//             query.isFeatured = req.query.isFeatured === 'true';
//         }

//         const products = await Product.find(query);
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Fetch single product
// // @route   GET /api/products/:id
// // @access  Public
// const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);

//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Create a product
// // @route   POST /api/products
// // @access  Private/Admin
// const createProduct = async (req, res) => {
//     try {
//         const product = new Product({
//             name: 'Sample name',
//             price: 0,
//             user: req.user._id,
//             image: '/images/sample.jpg',
//             brand: 'Sample brand',
//             category: 'Sample category',
//             countInStock: 0,
//             numReviews: 0,
//             description: 'Sample description',
//         });

//         const createdProduct = await product.save();
//         res.status(201).json(createdProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Update a product
// // @route   PUT /api/products/:id
// // @access  Private/Admin
// const updateProduct = async (req, res) => {
//     try {
//         const {
//             name,
//             price,
//             description,
//             image,
//             brand,
//             category,
//             countInStock,
//         } = req.body;

//         const product = await Product.findById(req.params.id);

//         if (product) {
//             product.name = name;
//             product.price = price;
//             product.description = description;
//             product.image = image;
//             product.brand = brand;
//             product.category = category;
//             product.countInStock = countInStock;

//             const updatedProduct = await product.save();
//             res.json(updatedProduct);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // @desc    Delete a product
// // @route   DELETE /api/products/:id
// // @access  Private/Admin
// const deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);

//         if (product) {
//             await product.deleteOne();
//             res.json({ message: 'Product removed' });
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };

import Product from "../models/Product.js";
import { createNotification } from "../services/notificationService.js";

/**
 * @desc    Fetch all products (with filters)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const query = {};

    // 🔍 Keyword search
    if (req.query.keyword) {
      query.name = {
        $regex: req.query.keyword.trim(),
        $options: "i",
      };
    }

    // 📂 Category filter
    if (req.query.category) {
      query.category = req.query.category.trim();
    }

    // 💰 Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // ⭐ Featured filter
    if (req.query.isFeatured !== undefined) {
      query.isFeatured = req.query.isFeatured === "true";
    }

    // for one query
    // const keyword = req.query.keyword;
    // const category = req.query.category;
    // const minPrice = req.query.minPrice;
    // const maxPrice = req.query.maxPrice;
    // const isFeatured = req.query.isFeatured;

    const products = await Product.find(query);

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Fetch single product
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    // 🔍 Validate ID
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Create a product (Admin)
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Update a product (Admin)
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name?.trim() || product.name;
    product.price = price ?? product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock ?? product.countInStock;

    const updatedProduct = await product.save();

    // Notify Admin of low stock
    if (updatedProduct.countInStock < 5) {
      await createNotification({
        type: "low_stock",
        title: "Low Stock Alert",
        message: `Product "${updatedProduct.name}" is low in stock (${updatedProduct.countInStock} remaining).`,
        meta: {
          productId: updatedProduct._id,
          countInStock: updatedProduct.countInStock
        }
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Delete a product (Admin)
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
