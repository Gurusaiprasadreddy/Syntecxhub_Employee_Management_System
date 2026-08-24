const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, 'Please add an employee ID'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please add a role'],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, 'Please add a salary'],
      min: [0, 'Salary cannot be negative'],
    },
    joiningDate: {
      type: Date,
      required: [true, 'Please add a joining date'],
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
