const express = require('express');
const router = express.Router();
const service = require('../controller/service.controller');

// Create a new service transaction
router.post('/', service.createService);

// Get all service transactions
router.get('/', service.getAllService);

// Get a single service  by its ID
router.get('/:id', service.getService);

// Update a service  by ID
router.patch('/:id', service.updateService);

// Delete a service  by ID
router.delete('/:id', service.deleteService);

module.exports = router;
