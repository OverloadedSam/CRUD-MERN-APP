const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: [true, 'Please provide a first name'],
      minLength: 3,
      maxLength: 128,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 128,
    },
    email: {
      type: String,
      require: [true, 'Please provide an email'],
      trim: true,
    },
    phone: {
      type: String,
      require: [true, 'Please provide a phone number'],
      minLength: 10,
      maxLength: 10,
      trim: true,
    },
    address: {
      type: String,
      require: [true, 'Please enter a valid address'],
      minLength: 5,
      maxLength: 1024,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Enter valid date of birth!'],
    },
    password: {
      type: String,
      require: [true, 'Password can not be empty!'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const SALT = process.env.SALT;

  const salt = await bcryptjs.genSalt(parseInt(SALT));
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const SECRET = process.env.SECRET;
  const payload = {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
  };
  const token = jwt.sign(payload, SECRET);

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
