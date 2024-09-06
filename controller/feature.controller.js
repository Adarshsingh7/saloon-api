const ProductTransaction = require('../model/productTransaction.model');
const ServiceTransaction = require('../model/serviceTransaction.model');
const UserProfile = require('../model/userProfile.model');
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

exports.getTopCustomer = async (req, res, next) => {
  try {
    const topCustomers = await UserProfile.aggregate([
      {
        $lookup: {
          from: 'producttransactions', // Product Transactions collection
          localField: '_id',
          foreignField: 'user',
          as: 'productTransactions',
        },
      },
      {
        $lookup: {
          from: 'servicetransactions', // Service Transactions collection
          localField: '_id',
          foreignField: 'user',
          as: 'serviceTransactions',
        },
      },
      {
        $addFields: {
          totalTransactions: {
            $add: [
              { $size: '$productTransactions' },
              { $size: '$serviceTransactions' },
            ],
          },
          productsPurchased: '$productTransactions',
          servicesUsed: '$serviceTransactions',
        },
      },
      { $sort: { totalTransactions: -1 } }, // Sort by total transactions
    ]);

    // Populate the product and location details in the product transactions
    for (let customer of topCustomers) {
      customer.productTransactions = await ProductTransaction.populate(
        customer.productTransactions,
        [
          { path: 'product', select: 'name price' }, // Populate product name and price
          { path: 'location', select: 'name' }, // Populate location name
        ],
      );

      // Similarly, you can populate the serviceTransactions if needed
      customer.serviceTransactions = await ServiceTransaction.populate(
        customer.serviceTransactions,
        [
          { path: 'service', select: 'name price' }, // Assuming service schema has name and price
          { path: 'location', select: 'name' }, // Populate location name
        ],
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        topCustomers,
      },
    });
  } catch (err) {
    next(err);
  }
};
