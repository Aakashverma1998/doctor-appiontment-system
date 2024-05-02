const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: String },
    doctorId: { type: String },
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
