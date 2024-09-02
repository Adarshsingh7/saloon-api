const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerVisitSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer Id is required'],
    },
    // subscription_plan_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'SubscriptionPlan'
    // },
    order_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    location_id: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location Id is required'],
    },
    start_time: {
      type: Date,
      default: Date.now(),
      required: [true, 'Start Time is required'],
    },
    end_time: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

customerVisitSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customer_id',
    select: 'name email address phone_number preferred_location_id',
  });
  next();
});

customerVisitSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'order_id',
    select: 'order_type status total_minutes',
  });
  next();
});

customerVisitSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'location_id',
    select: 'address city state zip_code',
  });
  next();
});
const CustomerVisit = mongoose.model('CustomerVisit', customerVisitSchema);
module.exports = CustomerVisit;
