const ServiceUsage = require('../model/serviceUsage.model');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');

// this function creates a service usage but will not return intead it will call next function
exports.createServiceUsageNext = catchAsync(async (req, res, next) => {
  await ServiceUsage.create({
    user: req.body.user_profile,
    available_balance: 0,
  });
  next();
});

exports.createServiceUsage = handlerFactory.createOne(ServiceUsage);
exports.getServiceUsage = handlerFactory.getOne(ServiceUsage);
exports.getAllServiceUsage = handlerFactory.getAll(ServiceUsage);
exports.updateServiceUsage = handlerFactory.updateOne(ServiceUsage);
exports.deleteServiceUsage = handlerFactory.deleteOne(ServiceUsage);
