const Product = require("../models/Product");

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { stock_quantity } = req.body;

    // Prevent negative stock
    if (stock_quantity < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Increase stock
exports.increaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    
    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be positive" });
    }
    product.stock_quantity += quantity;
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Decrease stock
exports.decreaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock_quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.stock_quantity -= quantity;
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get all low stock products
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lt: ["$stock_quantity", "$low_stock_threshold"] }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching low stock products" });
  }
};
