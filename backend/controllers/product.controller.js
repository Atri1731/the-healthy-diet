
const Product = require("../models/product.model");

// Get available products for the public menu
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
};

// Get all products for the admin panel
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin products.",
    });
  }
};

// Add a product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      rating,
      calories,
      price,
      image,
      isAvailable,
    } = req.body;

    if (
      !name?.trim() ||
      !category?.trim() ||
      !description?.trim() ||
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, category, description, and price are required.",
      });
    }

    const product = await Product.create({
      name,
      category,
      description,
      rating,
      calories,
      price,
      image,
      isAvailable,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({
      success: false,
      message: "Could not create product. Check the submitted details.",
    });
  }
};

// Edit a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(400).json({
      success: false,
      message: "Could not update product.",
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(400).json({
      success: false,
      message: "Could not delete product.",
    });
  }
};

module.exports = {
  getProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};