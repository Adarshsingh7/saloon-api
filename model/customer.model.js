/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email should be unique'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Customer Address is required'],
      trim: true,
    },
    phone_number: {
      type: String,
      required: [true, 'Phone Number is required'],
      unique: [true, 'Phone Number should be unique'],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Gender is required'],
    },
    gdpr_sms_active: {
      type: Boolean,
      default: false,
    },
    gdpr_email_active: {
      type: Boolean,
      default: false,
    },
    preferred_location_id: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location Id is required'],
    },
    // subscription_plan_id: {
    // 	type:[ Schema.Types.ObjectId],
    // 	ref: 'SubscriptionPlan',
    // 	required: true,
    // },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
