/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Location Name is Required'],
      trim: true,
      unique: [true, 'Location Name is Unique'],
    },
    address: {
      type: String,
      // required: [true, 'Location Address is Required'],
      trim: true,
    },
    city: {
      type: String,
      // required: [true, 'Location City is Required'],
      trim: true,
    },
    phone_number: {
      type: String,
      required: [true, 'Location Phone Number is Required'],
      trim: true,
    },
    postCode: {
      type: String,
      // required: [true, 'Location postCode Code is Required'],
      unique: [true, 'Location postCode Code is Unique'],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

locationSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
