/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product Name is Required'],
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Product Description is Required'],
    },
    price: {
      type: Number,
      required: [true, 'Product Price is Required'],
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      enum: {
        values: ['Product', 'Service'],
        message: '{VALUE} is not a valid product type',
      },
      default: 'Product',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const Product = mongoose.model('Product', productsSchema);
module.exports = Product;
