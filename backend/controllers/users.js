const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const {
  validateUserData,
  validateUpdatedUserData,
} = require('../utils/validations');

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

// @route    GET /api/customer/:id
// @desc     Get customer/user details by id.
// @access   Protected
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new Error();

  if (!req.user._id.equals(user._id) && !user.admin)
    return next(new ErrorResponse(401, 'Invalid credentials'));

  user.password = undefined;
  delete user.password;

  return res.status(200).json({
    success: true,
    status: 200,
    data: user,
  });
});

// @route   PUT /api/update/:id
// @access  Protected
// @desc    Update customer/user info in DB.
const updateUserById = asyncHandler(async (req, res, next) => {
  const userData = { ...req.body };
  const userId = req.user._id;
  delete userData.password;

  if (!userId.equals(req.params.id) && !req.user.admin)
    return next(new ErrorResponse(403, 'Invalid credentials'));

  // Validate user data to be updated.
  const { error } = validateUpdatedUserData(userData);

  if (error) {
    const [validationError] = error.details;

    return res.status(422).json({
      success: false,
      status: 422,
      message: validationError.message,
      key: validationError.context.key,
    });
  }

  const user = await User.updateOne({ _id: userId }, userData);

  if (user.modifiedCount === 0) throw new Error();

  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Your information has been updated successfully',
    data: userData,
  });
});

const deleteUserById = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  if (!userId.equals(req.params.id) && !req.user.admin)
    return next(new ErrorResponse(403, 'You have no authority to do this!'));

  const deleted = await User.findByIdAndDelete(userId);
  if (!deleted) throw new Error();

  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Your account has been deleted successfully',
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
