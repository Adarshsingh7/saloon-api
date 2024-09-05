const express = require('express');
const router = express.Router();
const serviceTransactionController = require('../controller/serviceTransactions.controller');

// Create a new service transaction
router.post('/', serviceTransactionController.createServiceTransaction);

// Get all service transactions
router.get('/', serviceTransactionController.getAllServiceTransaction);

// Get a single service transaction by its ID
router.get('/:id', serviceTransactionController.getServiceTransaction);

// Update a service transaction by ID
router.patch('/:id', serviceTransactionController.updateServiceTransaction);

// Delete a service transaction by ID
router.delete('/:id', serviceTransactionController.deleteServiceTransaction);

module.exports = router;
