const SubscriptionPlan = require('../model/subscriptionPlan.model');
const handlerFactory = require('./handlerFactory');

exports.createSubscriptionPlan = handlerFactory.createOne(SubscriptionPlan);
exports.getSubscriptionPlan = handlerFactory.getOne(SubscriptionPlan);
exports.getAllSubscriptionPlan = handlerFactory.getAll(SubscriptionPlan);
exports.updateSubscriptionPlan = handlerFactory.updateOne(SubscriptionPlan);
exports.deleteSubscriptionPlan = handlerFactory.deleteOne(SubscriptionPlan);