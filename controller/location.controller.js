/** @format */

const Location = require('../model/location.model');
const handlerFactory = require('./handlerFactory');

exports.createLocation = handlerFactory.createOne(Location);
exports.getLocation = handlerFactory.getOne(Location);
exports.getAllLocations = handlerFactory.getAll(Location);
exports.updateLocation = handlerFactory.updateOne(Location);
exports.deleteLocation = handlerFactory.deleteOne(Location);
