const ServiceUsage = require('../model/serviceUsage.model');
const handlerFactory = require('./handlerFactory');

exports.createServiceUsage = handlerFactory.createOne(ServiceUsage);
exports.getServiceUsage = handlerFactory.getOne(ServiceUsage);
exports.getAllServiceUsage = handlerFactory.getAll(ServiceUsage);
exports.updateServiceUsage = handlerFactory.updateOne(ServiceUsage);
exports.deleteServiceUsage = handlerFactory.deleteOne(ServiceUsage);
