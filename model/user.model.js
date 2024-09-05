/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'userName is required'],
      unique: [true, 'userName is unique'],
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
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    user_profile: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: [true, 'User Profile is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user_profile',
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

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken, encryptedToken: this.passwordResetToken });
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
