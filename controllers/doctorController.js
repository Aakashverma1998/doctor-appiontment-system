const Doctor = require("../models/doctor");
const helper = require("../utils/helper");
const User = require("../models/user");
const doctorRegister = async (req, res) => {
  try {
    let emailMatch = await Doctor.findOne({
      email: req.body.email,
    });
    if (emailMatch) {
      return res.status(200).json({
        success: false,
        message: "Doctor Exist  !",
      });
    }
    const doctor = Doctor({ ...req.body });
    let response = await doctor.save();
    const admin = await User.findOne({ isAdmin: true });
    const notification = admin.notification;
    notification.push({
      type: "apply-doctor.account",
      message: `${response.firstName} ${response.lastName} has applied for doctor.`,
      data: {
        doctorId: response._id,
        name: response.firstName + " " + response.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await User.findByIdAndUpdate(admin._id, { notification });
    return res.status(201).json({
      success: true,
      msg: "Doctor Account Applied SUCCESSFULLY.",
      data: response,
    });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const notification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push({ ...notification });
    user.notification = [];
    user.seennotification = notification;
    const updateUser = await user.save();
    return res.status(200).send({
      success: true,
      message: "all notification marked as read.",
      data: updateUser,
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};
const deleteNotification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      data: updateUser,
      message: "Notification Delete Successfully",
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const getDocInfo = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body._id });
    if (!doctor) {
      return res.status(200).send({
        success: false,
        message: "Doctor not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Doctor data fetch Successfully..",
      data: doctor,
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,

      { new: true }
    );
    return res.status(201).send({
      success: true,
      message: "Doctor data update Successfully..",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};
const getDoctorById = async()=>{
  try{
    const doctor = await Doctor.findOne({_id:req.body.doctorId})
    return res.status(200).send({
      success: true,
      message : "Doctor data fetch successfully",
      data : doctor
    })
  }catch(err){
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
}
module.exports = {
  doctorRegister,
  notification,
  deleteNotification,
  getDocInfo,
  updateDoctor,
  getDoctorById
};
