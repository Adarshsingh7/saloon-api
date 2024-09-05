/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfileSchema = new Schema(
  {
    role: {
      type: String,
      enum: {
        values: ['admin', 'user', 'customer'],
        message: `{VALUE} is not a valid status`,
      },
      default: 'customer',
    },
    firstName: {
      type: String,
      required: [true, 'Customer firstName is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Customer firstName is required'],
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
    postCode: {
      type: String,
      required: [true, 'Post Code is required'],
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
    },
    gdpr_sms_active: {
      type: Boolean,
      default: false,
    },
    gdpr_email_active: {
      type: Boolean,
      default: false,
    },
    referred_by: {
      type: String,
      required: [true, 'Referred by is required'],
    },
    preferred_location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location is required'],
    },
    avatar: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
userProfileSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  // this.find({ active: true });
  next();
});

userProfileSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'preferred_location',
  });
  next();
});
const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
