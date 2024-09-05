const Transaction = require('../model/transactions.model');
const handlerFactory = require('./handlerFactory');

exports.createTransaction = handlerFactory.createOne(Transaction);
exports.getTransaction = handlerFactory.getOne(Transaction);
exports.getAllTransaction = handlerFactory.getAll(Transaction);
exports.updateTransaction = handlerFactory.updateOne(Transaction);
exports.deleteTransaction = handlerFactory.deleteOne(Transaction);
