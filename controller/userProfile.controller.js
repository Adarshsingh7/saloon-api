/** @format */
const UserProfile = require('../model/userProfile.model');
const handlerFactory = require('./handlerFactory');

const ProductTransaction = require('../model/productTransaction.model');
const ServiceTransaction = require('../model/serviceTransaction.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { imageUpload } = require('../utils/imageUpload');
const User = require('../model/user.model');
const ServiceUsage = require('../model/serviceUsage.model');

exports.createUserProfile = handlerFactory.createOne(UserProfile);
exports.getUserProfile = handlerFactory.getOne(UserProfile);
exports.getAllUserProfile = handlerFactory.getAll(UserProfile);
exports.updateUserProfile = handlerFactory.updateOne(UserProfile);
exports.deleteUserProfile = handlerFactory.deleteOne(UserProfile);

// this function creates a user but will not return intead it will call next function
exports.createUserProfileNext = catchAsync(async (req, res, next) => {
  if (!req.body.userName || !req.body.password || req.body.password.length < 8)
    return new AppError('Please provide username and password', 400);
  if (await User.findOne({ userName: req.body.userName }))
    return next(new AppError('User already exists', 400));
  const newUserProfile = await UserProfile.create(req.body);
  req.body.user = newUserProfile._id;
  req.body.user_profile = newUserProfile._id;
  next();
});

exports.deleteUserProfileNext = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) {
    return next(new AppError('Please provide a valid user ID', 400));
  }

  // Find the user by ID and populate the user_profile field
  const user = await User.findOne({ user_profile: userId });

  // Check if the user exists
  if (!user) {
    return next(new AppError('User does not exist', 404));
  }

  // Delete the user profile
  const userProfileDeletion = await UserProfile.findByIdAndDelete(userId);

  // If user profile deletion failed
  if (!userProfileDeletion) {
    return next(new AppError('Failed to delete user profile', 500));
  }

  // Delete the user
  await User.findByIdAndDelete(user._id);

  res.status(204).json({
    status: 'success',
    message: 'User and user profile successfully deleted',
  });
});

exports.deleteCustomerProfileNext = catchAsync(async (req, res, next) => {
  const customerId = req.body.customerId; // Assuming customerId is sent in the request body

  // Check if customerId is provided
  if (!customerId) {
    return next(new AppError('Please provide a valid Customer ID', 400));
  }

  // Find the UserProfile by the customerId
  const userProfile = await UserProfile.findById(customerId);

  // Check if the UserProfile exists
  if (!userProfile) {
    return next(new AppError('Customer profile not found', 404));
  }

  // Delete the ServiceUsage associated with the UserProfile
  const serviceUsageDeletion = await ServiceUsage.deleteMany({
    user: customerId,
  });

  // Check if the service usage was successfully deleted
  if (!serviceUsageDeletion) {
    return next(
      new AppError('Failed to delete service usage for this customer', 500),
    );
  }

  // Delete the UserProfile
  const userProfileDeletion = await UserProfile.findByIdAndDelete(customerId);

  // Check if the user profile was successfully deleted
  if (!userProfileDeletion) {
    return next(new AppError('Failed to delete customer profile', 500));
  }

  // Return success response
  res.status(204).json({
    status: 'success',
    message: 'Customer profile and service usage successfully deleted',
  });
});

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

exports.updateUserImage = catchAsync(async (req, res) => {
  const user = req.body.userId;
  const userImage = req.files.userImage;

  const image = await imageUpload(
    userImage,
    process.env.FOLDER_NAME,
    1000,
    1000,
  );
  console.log(image.secure_url);

  const updatedProfile = await UserProfile.findByIdAndUpdate(
    user,
    { avatar: image.secure_url },
    { new: true },
  );
  res.status(200).json({
    status: 'success',
    message: 'User Image updated successfully',
    data: updatedProfile,
  });
});
