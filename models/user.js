const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const User = mongoose.model('User', userSchema);

module.exports = User;
