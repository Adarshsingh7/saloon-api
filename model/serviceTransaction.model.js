const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceTransactionsSchema = new Schema(
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
    type: {
      type: String,
      enum: {
        values: ['purchase', 'usage'],
        message: `{VALUE} is not a valid type`,
      },
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location Id is required'],
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service Id is required'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

serviceTransactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName email phone_number active',
  });
  next();
});

serviceTransactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'service',
    select: 'serviceName price',
  });
  next();
});

serviceTransactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'location',
    select: 'name address',
  });
  next();
});

serviceTransactionsSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const ServiceTransaction = mongoose.model(
  'ServiceTransaction',
  serviceTransactionsSchema,
);
module.exports = ServiceTransaction;
