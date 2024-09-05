/** @format */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const auth = require('./controller/auth.controller');
const userRouter = require('./route/user.route');
const locationRouter = require('./route/location.route');
const productRouter = require('./route/products.route');
const serviceUsageRouter = require('./route/serviceUsage.route');
const serviceTransactionRouter = require('./route/serviceTransactions.route');
const productTransactionRouter = require('./route/productTransactions.route');
const userProfileRouter = require('./route/userProfile.route');

const globalErrorHandler = require('./controller/error.controller');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use(auth.protect);
app.use('/api/v1/location', locationRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/service', serviceUsageRouter);
app.use('/api/v1/userProfile', userProfileRouter);
app.use('/api/v1/transaction', serviceTransactionRouter);
app.use('/api/v1/transaction', productTransactionRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'route is working fine',
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
