/** @format */

const express = require('express');
const userRouter = require('./route/user.route');
const locationRouter = require('./route/location.route');
const app = express();
app.use(express.json());

app.use('/api/v1/location', locationRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: 'route is working fine',
	});
});

module.exports = app;
