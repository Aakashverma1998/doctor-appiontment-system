const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
      type: String,
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
