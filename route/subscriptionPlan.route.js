const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscriptionPlan.controller');

// Create a new subscription plan
router.post('/', subscriptionController.createSubscriptionPlan);

// Get all subscription plans
router.get('/', subscriptionController.getAllSubscriptionPlan);

// Get a single subscription plan by ID
router.get('/:id', subscriptionController.getSubscriptionPlan);

// Update a subscription plan by ID
router.patch('/:id', subscriptionController.updateSubscriptionPlan);

// Delete a subscription plan by ID
router.delete('/:id', subscriptionController.deleteSubscriptionPlan);

module.exports = router;
