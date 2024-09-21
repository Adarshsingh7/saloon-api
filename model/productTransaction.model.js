const mongoose = require('mongoose');
const { Schema } = mongoose;

const productTransactionsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: [true, 'UserProfile Id is required'],
    },
    // date_time: {
    //   type: Date,
    //   default: Date.now(),
    //   required: [true, 'Transaction Date time is Required'],
    // },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location Id is required'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product Id is required'],
    },
    quantity: {
      type: Number,
      defaultValue: 1,
      required: [true, 'Minimum quantity is Required'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

productTransactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName email phone_number active',
  });
  next();
});

productTransactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'name brand price type',
  });
  next();
});

productTransactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'location',
    select: 'name address',
  });
  next();
});

productTransactionsSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const ProductTransaction = mongoose.model(
  'ProductTransaction',
  productTransactionsSchema,
);
module.exports = ProductTransaction;
