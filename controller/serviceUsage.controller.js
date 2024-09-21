const ServiceUsage = require('../model/serviceUsage.model');
const AppError = require('../utils/appError');
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

exports.getServiceUsageByUserId = catchAsync(async (req, res, next) => {
  const { userId } = req.body; // Assuming userId is passed in the body

  // If userId is not provided, throw an error
  if (!userId) {
    return next(new AppError('User ID is required', 400));
  }

  // Find service transactions by user ID
  const serviceUsage = await ServiceUsage.find({ user: userId });

  // If no transactions are found for the user, return an empty array
  if (!serviceUsage || serviceUsage.length === 0) {
    return res.status(200).json({
      status: 'success',
      data: {
        serviceTransactions: [],
      },
    });
  }

  // Respond with the list of transactions
  res.status(200).json({
    status: 'success',
    results: serviceUsage.length,
    data: {
      serviceUsage,
    },
  });
});

exports.createServiceUsage = handlerFactory.createOne(ServiceUsage);
exports.getServiceUsage = handlerFactory.getOne(ServiceUsage);
exports.getAllServiceUsage = handlerFactory.getAll(ServiceUsage);
exports.updateServiceUsage = handlerFactory.updateOne(ServiceUsage);
exports.deleteServiceUsage = handlerFactory.deleteOne(ServiceUsage);
