/** @format */

const express = require('express');
const router = express.Router();
const locationController = require('../controller/location.controller');

// Create a new user
router.post('/', locationController.createLocation);

// Get all users
router.get('/', locationController.getAllLocations);

// Get a single user by ID
router.get('/:id', locationController.getLocation);

// Update a user by ID
router.patch('/:id', locationController.updateLocation);

// Delete a user by ID
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
