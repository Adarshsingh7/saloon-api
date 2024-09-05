/** @format */
const UserProfile = require('../model/userProfile.model');
const handlerFactory = require('./handlerFactory');

const ProductTransaction = require('../model/productTransaction.model');
const ServiceTransaction = require('../model/serviceTransaction.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createUserProfile = handlerFactory.createOne(UserProfile);
exports.getUserProfile = handlerFactory.getOne(UserProfile);
exports.getAllUserProfile = handlerFactory.getAll(UserProfile);
exports.updateUserProfile = handlerFactory.updateOne(UserProfile);
exports.deleteUserProfile = handlerFactory.deleteOne(UserProfile);

// we need userId for which information is to be needed
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await UserProfile.findById(req.body.userId);
  if (!user) return next(new AppError('User not found', 404));

  const id = user.id;

  //get all product Transactions and service transactions
  const productTransactions = await ProductTransaction.find({ user: id });
  const serviceTransactions = await ServiceTransaction.find({ user: id });

  res.status(200).json({
    status: 'success',
    data: {
      user,
      productTransactions,
      serviceTransactions,
    },
  });
});
