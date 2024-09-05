const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer Id is required'],
    },
    order_type: {
      type: String,
      enum: ['subscription', 'product'],
      required: [true, 'Order Type is required'],
    },
    // subscription_plan_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'SubscriptionPlan',
    // },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    total_minutes: {
      type: Number,
      required: [true, 'Total minutes is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['inactive', 'active', 'expired', 'cancelled'],
        message: `{VALUE} is not a valid status`,
      },
    },
    order_date: {
      type: Date,
      default: Date.now(),
      required: [true, 'Order Date is required'],
    },
    location_id: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location ID is required'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customer_id',
    select: 'name email phone_number address',
  });
  next();
});

// orderSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'subscription_plan_id',
//     select: 'plan_name plan_description price minutes_available',
//   });
//   next();
// });

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product_id',
    select: 'name stock price brand',
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'location_id',
    select: 'address city state zip_code',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
