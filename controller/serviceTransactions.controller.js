const ServiceTransaction = require('../model/serviceTransactions.model');
const handlerFactory = require('./handlerFactory');

exports.createServiceTransaction = handlerFactory.createOne(ServiceTransaction);
exports.getServiceTransaction = handlerFactory.getOne(ServiceTransaction);
exports.getAllServiceTransaction = handlerFactory.getAll(ServiceTransaction);
exports.updateServiceTransaction = handlerFactory.updateOne(ServiceTransaction);
exports.deleteServiceTransaction = handlerFactory.deleteOne(ServiceTransaction);
