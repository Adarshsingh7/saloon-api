
const Customer = require('../model/customer.model');
const handlerFactory = require('./handlerFactory');

exports.createCustomer = handlerFactory.createOne(Customer);
exports.getCustomer = handlerFactory.getOne(Customer);
exports.getAllCustomer = handlerFactory.getAll(Customer);
exports.updateCustomer = handlerFactory.updateOne(Customer);
exports.deleteCustomer = handlerFactory.deleteOne(Customer);
