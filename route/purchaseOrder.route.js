const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controller/purchaseOrder.controller');

// Create a new purchase order
router.post('/', purchaseOrderController.createPurchaseOrder);

// Get all purchase orders
router.get('/', purchaseOrderController.getAllPurchaseOrder);

// Get a single purchase order by ID
router.get('/:id', purchaseOrderController.getPurchaseOrder);

// Update a purchase order by ID
router.patch('/:id', purchaseOrderController.updatePurchaseOrder);

// Delete a purchase order by ID
router.delete('/:id', purchaseOrderController.deletePurchaseOrder);

module.exports = router;