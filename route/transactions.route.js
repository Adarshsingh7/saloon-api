const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactions.controller');

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Get all transactions
router.get('/', transactionController.getAllTransaction);

// Get a single transaction by its ID
router.get('/:id', transactionController.getTransaction);

// Update a transaction by ID
router.patch('/:id', transactionController.updateTransaction);

// Delete a transaction by ID
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
