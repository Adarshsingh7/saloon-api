const ProductTransaction = require('../model/productTransactions.model');
const handlerFactory = require('./handlerFactory');

exports.createProductTransaction = handlerFactory.createOne(ProductTransaction);
exports.getProductTransaction = handlerFactory.getOne(ProductTransaction);
exports.getAllProductTransaction = handlerFactory.getAll(ProductTransaction);
exports.updateProductTransaction = handlerFactory.updateOne(ProductTransaction);
exports.deleteProductTransaction = handlerFactory.deleteOne(ProductTransaction);