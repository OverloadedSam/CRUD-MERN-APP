const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { validateUserData } = require('../utils/validations');

// @route    POST /api/register
// @desc     Register user to the DB
// @access   Public
const registerUser = asyncHandler(async (req, res, next) => {
  const userData = { ...req.body };

  const { error } = validateUserData(userData);

  if (error) {
    const [validationError] = error.details;

    return res.status(422).json({
      success: false,
      status: 422,
      message: validationError.message,
      key: validationError.context.key,
    });
  }

  const userFound = await User.findOne({ email: userData.email });
  if (userFound)
    return next(new ErrorResponse(400, 'Email is already registered!'));

  const user = new User(userData);
  await user.save();
  const token = user.generateAuthToken();

  return res.status(201).header('x-auth-token', token).json({
    success: true,
    status: 201,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token,
  });
});

// @route    POST /api/login
// @desc     Login for registered users.
// @access   Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new ErrorResponse(400, 'Please provide both email and password!')
    );

  const user = await User.findOne({ email });

  if (!user)
    return next(new ErrorResponse(400, 'This email is not registered!'));

  if (!(await user.matchPassword(password)))
    return next(new ErrorResponse(400, 'Invalid password!'));

  const token = user.generateAuthToken();

  res.status(200).header('x-auth-token', token).json({
    success: true,
    status: 200,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token,
  });
});

module.exports = { registerUser, loginUser };
