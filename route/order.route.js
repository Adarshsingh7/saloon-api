const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrder);

// Get a single order by ID
router.get('/:id', orderController.getOrder);

// Update a order by ID
router.patch('/:id', orderController.updateOrder);

// Delete a order by ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
