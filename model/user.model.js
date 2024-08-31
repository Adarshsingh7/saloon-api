/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is unique'],
      trim: true,
      lowercase: [true, 'Email in lowercase'],
    },
    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: [true, 'Phone number is unique'],
      trim: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'],
      trim: true,
      maxlength: 100,
      minlength: 8,
    },
    type: {
      type: String,
      enum: ['admin', 'operator'],
      required: [true, 'Type must be Admin or operator'],
    },
    location_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Location',
      required: [true, 'Location Id is required'],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'location',
    select: 'address city state zip_code',
  });
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  // this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  try {
    return await bcrypt.compare(candidatePassword, userPassword);
  } catch (err) {
    console.log('an error occoured: ', err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
