const Service = require('../model/service.model');
const handlerFactory = require('./handlerFactory');

exports.createService = handlerFactory.createOne(Service);
exports.getService = handlerFactory.getOne(Service);
exports.getAllService = handlerFactory.getAll(Service);
exports.updateService = handlerFactory.updateOne(Service);
exports.deleteService = handlerFactory.deleteOne(Service);
