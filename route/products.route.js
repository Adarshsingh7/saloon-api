const express = require('express');
const router = express.Router();
const productsController = require('../controller/products.controller');

// Create a new product
router.post('/', productsController.createProduct);

// Get all products
router.get('/', productsController.getAllProducts);

// Get a single product by ID
router.get('/:id', productsController.getProduct);

// Update a product by ID
router.patch('/:id', productsController.updateProduct);

// Delete a product by ID
router.delete('/:id', productsController.deleteProduct);

module.exports = router;