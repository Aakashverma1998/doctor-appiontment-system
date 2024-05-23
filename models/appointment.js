const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    doctorInfo: { type: String },
    userInfo: { type: String },
    date: { type: String },
    time: { type: String },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("appointments", appointmentSchema);
