/** @format */

const express = require('express');
const router = express.Router();
const featureController = require('../controller/feature.controller');
const authController = require('../controller/auth.controller');

// only admin can access the routes below
router.use(authController.restrictTo('admin'));
router.get('/totalSales', featureController.getAllSales);
router.get('/salesByLocation', featureController.getSalesByLocation);

module.exports = router;
