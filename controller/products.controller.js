const Product = require('../model/products.model');
const handlerFactory = require('./handlerFactory');

exports.createProduct = handlerFactory.createOne(Product);
exports.getProduct = handlerFactory.getOne(Product);
exports.getAllProduct = handlerFactory.getAll(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);