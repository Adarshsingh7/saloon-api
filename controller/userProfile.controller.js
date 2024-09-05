/** @format */
const UserProfile = require('../model/userProfile.model');
const handlerFactory = require('./handlerFactory');

exports.createUserProfile = handlerFactory.createOne(UserProfile);
exports.getUserProfile = handlerFactory.getOne(UserProfile);
exports.getAllUserProfile = handlerFactory.getAll(UserProfile);
exports.updateUserProfile = handlerFactory.updateOne(UserProfile);
exports.deleteUserProfile = handlerFactory.deleteOne(UserProfile);
