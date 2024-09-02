const express = require('express');
const router = express.Router();
const customerVisitController = require('../controller/customerVisit.controller');

// Create a new customer visit
router.post('/', customerVisitController.createCustomerVisit);

// Get all Customer Visits
router.get('/', customerVisitController.getAllCustomerVisit);

// Get a single customer visit by ID
router.get('/:id', customerVisitController.getCustomerVisit);

// Update a customer visit by ID
router.patch('/:id', customerVisitController.updateCustomerVisit);

// Delete a customer visit by ID
router.delete('/:id', customerVisitController.deleteCustomerVisit);

module.exports = router;