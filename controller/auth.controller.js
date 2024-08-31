const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/user.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

const createAndSendToken = function (user, statusCode, res) {
  const token = signToken(user.id);

  const cookieOption = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 24,
    ),
    // secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res.cookie('jwt', token, cookieOption);
  // console.log(req.cookie);

  user.password = undefined;
  return res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: req.body.password,
    location_id: req.body.location_id,
    type: req.body.type, // need to be removed in production
  });

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // checking user has input email and password
  if (!email || !password)
    return next(new AppError('enter email and password', 400));

  // check weather user is present in data base or not
  const user = await User.findOne({ email }).select('+password');

  // checking password from the data base
  // const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('incorrect email or password', 403));

  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) check token and check if it is there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // console.log(token);
  if (!token) return next(new AppError('please log in to get access', 401));

  // 2) validate the token
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

  // 3) check user if he still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(new AppError('user does not exist log in again!', 401));

  // 4)check user changed password after jwt was issued
  //   if (!freshUser.changedPasswordAfter())
  //     return next(
  //       new AppError('the password has been changed please login again', 401),
  //     );

  req.user = freshUser;
  // req.locals.user = freshUser;
  next();
});

exports.restrictTo = function (...types) {
  return (req, res, next) => {
    if (!types.includes(req.user.type))
      return next(
        new AppError('you not have permision to perform this action', 403),
      );
    else next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) find the user
  const user = await User.findById(req.user.id).select('+password');

  // 2) take data
  const { currentPassword, newPassword, passwordConfirm } = req.body;
  if (newPassword != passwordConfirm)
    return next(
      new AppError('new password and password confirm are not same', 403),
    );

  // check password confirm is same to the database password
  if (!(await user.correctPassword(currentPassword, user.password)))
    return next(new AppError('invalid current password', 400));
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'password changed successfully',
    token,
  });
});
