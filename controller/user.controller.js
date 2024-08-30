/** @format */

const User = require('../model/user.model');
const catchAsync = require('../utils/catchAsync');

function sendSuccessResponse(res, data, statusCode = 200) {
	return res.status(statusCode).json({
		status: 'success',
		statusCode,
		data,
	});
}

// Create a new user
exports.createUser = catchAsync(async (req, res) => {
	const { name, email, password, phone_number, location, type } = req.body;

	// Validate request data
	if (!name || !email || !password || !type || !phone_number || !location) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// Check if the user already exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).json({ message: 'User already exists' });
	}

	// Create and save the new user
	const user = new User({
		name,
		email,
		password,
		phone_number,
		location,
		type,
	});
	await user.save();

	sendSuccessResponse(res, user, 201);
});

// Get a list of all users
exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

// Get a user by ID
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

// Update a user by ID
exports.updateUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Find the user by ID and update
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ name, email, password },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({ message: 'User updated successfully', user });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};
