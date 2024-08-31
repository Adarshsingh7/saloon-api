const PurchaseOrder = require('../model/purchaseOrder.model');
const handlerFactory = require('./handlerFactory');

exports.createPurchaseOrder = handlerFactory.createOne(PurchaseOrder);
exports.getPurchaseOrder = handlerFactory.getOne(PurchaseOrder);
exports.getAllPurchaseOrder = handlerFactory.getAll(PurchaseOrder);
exports.updatePurchaseOrder = handlerFactory.updateOne(PurchaseOrder);
exports.deletePurchaseOrder = handlerFactory.deleteOne(PurchaseOrder);