/** @format */

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://officialadarsh2021:sgNfrz8VDV9GQqdL@cluster0.o4f3c.mongodb.net/SALOON_DB'
	)
	.then(() => {
		console.log('DB connection successful');
	})
	.catch((err) => {
		console.log('DB connection failed');
		console.log(err);
	});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
