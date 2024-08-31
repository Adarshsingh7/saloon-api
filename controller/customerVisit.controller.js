const CustomerVisit = require('../model/customerVisit.model');
const handlerFactory = require('./handlerFactory');

exports.createCustomerVisit = handlerFactory.createOne(CustomerVisit);
exports.getCustomerVisit = handlerFactory.getOne(CustomerVisit);
exports.getAllCustomerVisit = handlerFactory.getAll(CustomerVisit);
exports.updateCustomerVisit = handlerFactory.updateOne(CustomerVisit);
exports.deleteCustomerVisit = handlerFactory.deleteOne(CustomerVisit);
