const express = require('express');
const router = express.Router();
const productTransactionController = require('../controller/productTransactions.controller');

// Create a new service transaction
router.post('/', productTransactionController.createProductTransaction);

// Get all service transactions
router.get('/', productTransactionController.getAllProductTransaction);

// Get a single service transaction by its ID
router.get('/:id', productTransactionController.getProductTransaction);

// Update a service transaction by ID
router.patch('/:id', productTransactionController.updateProductTransaction);

// Delete a service transaction by ID
router.delete('/:id', productTransactionController.deleteProductTransaction);

module.exports = router;
