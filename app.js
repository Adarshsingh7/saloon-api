/** @format */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const authController = require('./controller/auth.controller');
const swaggerFile = require('./swagger_output.json');

const userRouter = require('./route/user.route');
const locationRouter = require('./route/location.route');
const productRouter = require('./route/products.route');
const serviceUsageRouter = require('./route/serviceUsage.route');
const serviceTransactionRouter = require('./route/serviceTransactions.route');
const productTransactionRouter = require('./route/productTransactions.route');
const userProfileRouter = require('./route/userProfile.route');
const service = require('./route/service.route');
const featureRouter = require('./route/feature.route');
const globalErrorHandler = require('./controller/error.controller');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'route is working fine',
  });
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/location', authController.protect, locationRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/userProfile', authController.protect, userProfileRouter);
app.use('/api/v1/service', authController.protect, service);
app.use('/api/v1/serviceUsage', authController.protect, serviceUsageRouter);
app.use(
  '/api/v1/productTransaction',
  authController.protect,
  productTransactionRouter,
);
app.use(
  '/api/v1/serviceTransaction',
  authController.protect,
  serviceTransactionRouter,
);
app.use('/api/v1', authController.protect, featureRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
