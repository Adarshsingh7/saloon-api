/** @format */
const User = require('../model/user.model');
const UserProfile = require('../model/userProfile.model');
const AppError = require('../utils/appError');
const handlerFactory = require('./handlerFactory');

exports.createNewUser = async (req, res, next) => {
  let newUserProfileCreated = false;
  let newUserCreated = false;
  let newUserProfileId = '';
  try {
    const newUserProfile = await UserProfile.create({
      ...req.body,
    });
    newUserProfileCreated = true;
    newUserProfileId = newUserProfile._id;

    // Create a new user with the created UserProfile reference
    const newUser = await User.create({
      ...req.body,
      user_profile: newUserProfile._id,
    });
    newUserCreated = true;

    res.status(201).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    if (newUserProfileCreated && !newUserCreated) {
      await UserProfile.findByIdAndDelete(newUserProfileId);
    }
    next(new AppError('failed to create the user' + error.message, 400));
  }
};

exports.createUser = handlerFactory.createOne(User);
exports.getUser = handlerFactory.getOne(User);
exports.getAllUser = handlerFactory.getAll(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
