/** @format */
const UserProfile = require('../model/userProfile.model');
const handlerFactory = require('./handlerFactory');

exports.createUser = handlerFactory.createOne(UserProfile);
exports.getUser = handlerFactory.getOne(UserProfile);
exports.getAllUser = handlerFactory.getAll(UserProfile);
exports.updateUser = handlerFactory.updateOne(UserProfile);
exports.deleteUser = handlerFactory.deleteOne(UserProfile);
