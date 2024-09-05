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
			required: [true, 'Location Address is Required'],
			trim: true,
		},
		city: {
			type: String,
			required: [true, 'Location City is Required'],
			trim: true,
		},
		state: {
			type: String,
			required: [true, 'Location State is Required'],
			trim: true,
		},
		zip_code: {
			type: String,
			required: [true, 'Location ZIP Code is Required'],
			unique: [true, 'Location ZIP Code is Unique'],
			trim: true,
		},
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
