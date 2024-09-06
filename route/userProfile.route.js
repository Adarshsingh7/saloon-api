const express = require('express');
const router = express.Router();
const userProfileController = require('../controller/userProfile.controller');

// Get user details
router.get('/userDetails', userProfileController.getUserDetails);
router.post('/updateProfile', userProfileController.updateUserImage);
// router.post('sendEmail', userProfileController.sendTestEmail);
// Create a new user profile
router.post('/', userProfileController.createUserProfile);

// Get all user profiles
router.get('/', userProfileController.getAllUserProfile);

// Get a single user profile by its ID
router.get('/:id', userProfileController.getUserProfile);

// Update a user profile by ID
router.patch('/:id', userProfileController.updateUserProfile);

// Delete a user profile by ID
router.delete('/:id', userProfileController.deleteUserProfile);

module.exports = router;
