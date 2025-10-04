const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");

// CRUD
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);

// Low stock products
router.get("/low-stock", productController.getLowStockProducts);

router.get("/:id", productController.getProductById);


router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Stock management
router.post("/:id/increase", productController.increaseStock);
router.post("/:id/decrease", productController.decreaseStock);

module.exports = router;
