const ProductTransaction = require('../model/productTransaction.model');
const ServiceTransaction = require('../model/serviceTransaction.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getSalesByLocation = catchAsync(async (req, res, next) => {
  const locationId = req.body.locationId;
  if (!locationId) {
    return next(new AppError('Location is required'));
  }

  const allServiceTransaction = await ServiceTransaction.find({
    location: locationId,
  });

  const allProductTransaction = await ProductTransaction.find({
    location: locationId,
  });

  res.status(200).json({
    success: true,
    message: 'Sales are successfully Fetched!',
    data: {
      allServiceTransaction,
      allProductTransaction,
    },
  });
});

exports.getAllSales = catchAsync(async (_, res) => {
  const allServiceTransaction = await ServiceTransaction.find();
  const allProductTransaction = await ProductTransaction.find();

  res.status(200).json({
    success: true,
    message: 'Total Sales are successfully fetched!',
    data: {
      allServiceTransaction,
      allProductTransaction,
    },
  });
});
