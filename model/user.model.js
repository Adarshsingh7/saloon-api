/** @format */

const mongoose = require('mongoose');
const Location = require('./location.model');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		phone_number: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
			minlength: 8,
		},
		type: {
			type: String,
			enum: ['admin', 'operator'],
			required: true,
		},
		location: {
			type: mongoose.Schema.ObjectId,
			ref: 'Location',
			required: true,
			trim: true,
		},
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
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
	userPassword
) {
	try {
		return await bcrypt.compare(candidatePassword, userPassword);
	} catch (err) {
		console.log('an error occoured: ', err);
	}
};

const User = mongoose.model('User', userSchema);

module.exports = User;
