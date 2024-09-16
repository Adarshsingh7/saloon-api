const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/user.model');
const UserProfile = require('./../model/userProfile.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const crypto = require('crypto');

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

exports.signUp = async (req, res, next) => {
  let newUserProfileCreated = false;
  let newUserCreated = false;
  let newUserProfileId = '';
  try {
    const newUserProfile = await UserProfile.create({
      ...req.body,
      role: undefined,
    });
    newUserProfileCreated = true;
    newUserProfileId = newUserProfile._id;

    // Create a new user with the created UserProfile reference
    const newUser = await User.create({
      ...req.body,
      user_profile: newUserProfile._id,
    });
    newUserCreated = true;

    // Send the plain user object to the token creation function
    createAndSendToken(newUser, 201, res);
  } catch (error) {
    if (newUserProfileCreated && !newUserCreated) {
      await UserProfile.findByIdAndDelete(newUserProfileId);
    }
    next(new AppError('failed to create the user' + error.message, 400));
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;

  // checking user has input email and password
  if (!userName || !password)
    return next(new AppError('enter userName and password', 400));

  // check weather user is present in data base or not
  const user = await User.findOne({ userName }).select('+password');

  // checking password from the data base
  // const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('incorrect user name or password', 403));

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
  req.user.role = freshUser.user_profile.role;
  // req.locals.user = freshUser;
  next();
});

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
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
  if (newPassword !== passwordConfirm)
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

exports.forgotPassword = async (req, res, next) => {
  try {
    // get the user based on posted email
    const freshUser = await User.findOne({ email: req.body.email });

    if (!freshUser) return next(new AppError('user not exist', 400));

    // generate random token for reseting password
    const resetToken = freshUser.createPasswordResetToken();
    await freshUser.save({ validateBeforeSave: false });

    // send it to users email
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `FORGOT your password? submit your PATCH request with your new password and password confirm to ${resetURL}\n ignore this email if you did'nt forgot your password`;
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'there was an error while sending an email',
    });
  }
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on the token
  const hashed = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if password has not expired then set the new password
  if (!user)
    return next(new AppError('token is invalid or has been expired', 400));

  // 3) update the change password property
  user.password = req.body.password;
  user.passwordResetToken = undefined;

  await user.save();

  // 4) log in the user
  const token = signToken(user.id);
  res.status(200).json({
    status: 'success',
    message: 'password changed successfully',
    token,
  });
});

exports.getMe = catchAsync(async (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});
