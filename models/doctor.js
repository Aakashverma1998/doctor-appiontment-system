const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: {
      type: String,
      default: false,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    specialization: {
      type: String,
    },
    experience: {
      trype: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    feesPerCunsaltation: {
      type: Number,
    },
    timings: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Doctor", doctorSchema);
