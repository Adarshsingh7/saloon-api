const ServiceTransaction = require('../model/serviceTransaction.model');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');
const ServiceUsage = require('../model/serviceUsage.model');
const AppError = require('../utils/appError');

exports.createServiceTransaction = catchAsync(async (req, res, next) => {
  const { user, quantity, type, location, service } = req.body;

  // Find the user's service usage balance
  let serviceUsage = await ServiceUsage.findOne({ user });

  // If no record exists for the user, create one with default balance
  if (!serviceUsage) {
    serviceUsage = await ServiceUsage.create({
      user,
      available_balance: 0, // Default to 0 if not found
    });
  }

  // Adjust balance based on transaction type
  if (type === 'purchase') {
    // Increase the available balance for purchases
    serviceUsage.available_balance += quantity;
  } else if (type === 'usage') {
    // Decrease the available balance for usages
    if (serviceUsage.available_balance < quantity) {
      return next(
        new AppError('Insufficient balance for this service usage', 400),
      );
    }
    serviceUsage.available_balance -= quantity;
  } else {
    return next(new AppError('Invalid transaction type', 400));
  }

  // Save the updated balance
  await serviceUsage.save();

  // Create the service transaction record
  const serviceTransaction = await ServiceTransaction.create({
    user,
    quantity,
    type,
    location,
    service,
  });

  // Respond with the new transaction
  res.status(201).json({
    status: 'success',
    data: {
      serviceTransaction,
      available_balance: serviceUsage.available_balance,
    },
  });
});
exports.getServiceTransaction = handlerFactory.getOne(ServiceTransaction);
exports.getAllServiceTransaction = handlerFactory.getAll(ServiceTransaction);
exports.updateServiceTransaction = handlerFactory.updateOne(ServiceTransaction);
// exports.deleteServiceTransaction = handlerFactory.deleteOne(ServiceTransaction);

exports.deleteServiceTransaction = catchAsync(async (req, res, next) => {
  const { transactionId } = req.params;

  // Find the service transaction by ID
  const serviceTransaction = await ServiceTransaction.findById(transactionId);

  // If no transaction is found, throw an error
  if (!serviceTransaction) {
    return next(new AppError('No service transaction found with this ID', 404));
  }

  const { user, quantity, type } = serviceTransaction;

  // Find the user's service usage record
  const serviceUsage = await ServiceUsage.findOne({ user });

  // If no service usage record exists, throw an error (this should be rare since a transaction exists)
  if (!serviceUsage) {
    return next(
      new AppError('No service usage record found for this user', 404),
    );
  }

  // Adjust the balance based on the transaction type
  if (type === 'purchase') {
    // Decrease the available balance for purchases (since we're undoing the purchase)
    if (serviceUsage.available_balance < quantity) {
      return next(
        new AppError('Insufficient balance to reverse this purchase', 400),
      );
    }
    serviceUsage.available_balance -= quantity;
  } else if (type === 'usage') {
    // Increase the available balance for usage (since we're undoing the usage)
    serviceUsage.available_balance += quantity;
  } else {
    return next(new AppError('Invalid transaction type', 400));
  }

  // Save the updated balance
  await serviceUsage.save();

  // Delete the service transaction
  await ServiceTransaction.findByIdAndDelete(transactionId);

  // Respond with success message
  res.status(204).json({
    status: 'success',
    message: 'Service transaction deleted successfully',
  });
});
