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
            required: [true, 'Brand Name is Required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Product Description is Required'],
            trim: true,
        },
		price: {
			type: Number,
			required: [true, 'Product Price is Required'],
		},
		stock: {
			type: Number,
			required: [true, 'Product Stock is Required'],
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Product = mongoose.model('Product', productsSchema);
module.exports = Product;
