const Doctor = require("../models/doctor");
const helper = require("../utils/helper");
const User = require("../models/user");
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find({ isAdmin: false });
    if (!users) {
      return res.status(200).json({
        success: false,
        message: "Users not found  !",
      });
    }
    return res.status(201).json({
      success: true,
      msg: "Users fetch SUCCESSFULLY.",
      data: users,
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const getAllDoctors = async (req, res) => {
  try {
    let doctor = await Doctor.find({});
    if (!doctor) {
      return res.status(200).json({
        success: false,
        message: "Doctors not found  !",
      });
    }
    return res.status(201).json({
      success: true,
      msg: "Doctors fetch SUCCESSFULLY.",
      data: doctor,
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );
    const user = await User.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request has ${status} `,
      onclickPath: "/notification",
    });
    if (doctor.status === "approved") {
      user.isDoctor = true;
      await user.save();
    }
    return res.status(200).send({
      success: true,
      message: "Account status updated",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

module.exports = {
  getAllUsers,
  getAllDoctors,
  changeAccountStatus,
};
