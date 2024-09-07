/** @format */

const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

// only admin can access the routes below
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(userController.createUser)
  .get(userController.getAllUser);

// Get a single user by ID
router.get('/:id', userController.getUser);

// Update a user by ID
router.patch('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
