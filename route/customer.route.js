const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer.controller');

// Create a new Customer
router.post('/', customerController.createCustomer);

// Get All Customers
router.get('/', customerController.getAllCustomer);

// Get a single Customer by ID
router.get('/:id', customerController.getCustomer);

// Update a Customer by ID
router.patch('/:id', customerController.updateCustomer);

// Delete a Customer by ID
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
