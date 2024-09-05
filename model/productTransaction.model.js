const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: [true, 'UserProfile Id is required'],
    },
    date_time: {
      type: Date,
      default: Date.now(),
      required: [true, 'Transaction Date time is Required'],
    },
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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

transactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
  });
  next();
});

transactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
  });
  next();
});

transactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'location',
    select: 'name address',
  });
  next();
});

const Transaction = mongoose.model('ProductTransaction', transactionsSchema);
module.exports = Transaction;
