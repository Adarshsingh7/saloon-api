/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		state: {
			type: String,
			required: true,
			trim: true,
		},
		zip_code: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
