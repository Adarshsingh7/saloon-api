/** @format */

const express = require('express');
const router = express.Router();
const featureController = require('../controller/feature.controller');
const authController = require('../controller/auth.controller');
const {
  createUserProfileNext,
  deleteUserProfileNext,
  deleteCustomerProfileNext,
} = require('../controller/userProfile.controller');
const { createServiceUsage } = require('../controller/serviceUsage.controller');
const { createUser } = require('../controller/user.controller');

// only admin can access the routes below
router.use(authController.restrictTo('admin'));

router.post('/createCustomer', createUserProfileNext, createServiceUsage);
router.delete('/deleteCustomer', deleteCustomerProfileNext);
router.post('/createUser', createUserProfileNext, createUser);
router.delete('/deleteUser', deleteUserProfileNext);
router.get('/totalSales', featureController.getAllSales);
router.get('/salesByLocation', featureController.getSalesByLocation);
router.get('/topCustomer', featureController.getTopCustomer);
router.post(
  '/productTransactions',
  featureController.getAllProductTransactionByUser,
);
router.post(
  '/serviceTransactions',
  featureController.getAllServiceTransactionByUser,
);
module.exports = router;
