const express = require('express');
const router = express.Router();
const serviceUsageController = require('../controller/serviceUsage.controller');

// Create a new service usage
router.post('/', serviceUsageController.createServiceUsage);

// Get all service usage
router.get('/', serviceUsageController.getAllServiceUsage);

// Get a single service usage
router.get('/:id', serviceUsageController.getServiceUsage);

// Update a service usage by Id
router.patch('/:id', serviceUsageController.updateServiceUsage);

// Delete a service usage by Id
router.delete('/:id', serviceUsageController.deleteServiceUsage);

module.exports = router;
