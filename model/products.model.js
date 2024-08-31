/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Product = mongoose.model('Product', productsSchema);
module.exports = Product;
