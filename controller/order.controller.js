const Order = require('../model/order.model');
const handlerFactory = require('./handlerFactory');

exports.createOrder = handlerFactory.createOne(Order);
exports.getOrder = handlerFactory.getOne(Order);
exports.getAllOrder = handlerFactory.getAll(Order);
exports.updateOrder = handlerFactory.updateOne(Order);
exports.deleteOrder = handlerFactory.deleteOne(Order);