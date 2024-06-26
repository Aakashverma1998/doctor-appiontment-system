const User = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointment");
const moment = require("moment");
const helper = require("../utils/helper");
const { userForgetPassword, userVerifyMail } = require("../middleware/mail");
const userRegister = async (req, res) => {
  try {
    let emailMatch = await User.findOne({
      email: req.body.email.toLowerCase(),
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (emailMatch) {
      return res.status(200).json({
        success: false,
        message: "User Exist Please Login !",
      });
    }
    const user = User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      phone: req.body.phone
    });
    const email = req.body.email.toLowerCase()
    if (email === "admin@gmail.com") {
      user.isAdmin = true
    }
    let response = await user.save();
    delete response.password;
    return res.status(201).json({
      success: true,
      msg: "USER REGISTER SUCCESSFULLY.",
      data: response,
    });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase()
    let user = await User.findOne({
      email
    });
    if (user) {
      let passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        let token = jwt.sign(
          {
            _id: user._id.toString(),
          },
          process.env.secret_key,
          {
            expiresIn: "24h",
          }
        );
        user.tokens.push({ token });
        await user.save();
        await userVerifyMail(user)
        let isEmailVerify = await User.findOne({email, isEmailVerified: true })
        if (!isEmailVerify) {
          return res.status(200).json({ success: false, message: "Please verify your mail before Login.!" })
        }
        res.status(201).json({
          success: true,
          message: "Login Success",
          data: user,
          token,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid Email or Password !",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Invalid Email or Password !",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const getUser = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user._id });
    delete userData.password;
    if (!userData) {
      return res
        .status(200)
        .send({ message: "User not Found", success: false });
    }
    return res.status(200).send({ success: true, data: userData });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const forgetPassword = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res
        .status(200)
        .send({ message: "User not Found", success: false });
    }
    await userForgetPassword(userData);
    return res
      .status(200)
      .send({ success: true, message: "ResetPassword Link Sent Your Mail." });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const resetPassword = async (req, res) => {
  try {
    if (req.body.password != req.body.confirmpassword) {
      return res
        .status(200)
        .send({ message: "User password and confirmpassword", success: false });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
    });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not Found", success: false });
    }
    return res.status(200).send({ success: true, data: user });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const allDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.find({ status: "approved" }).populate({ path: "userId", select: "name email isAdmin isDoctor createdAt" });
    return res.status(200).send({
      success: true,
      message: "Doctor data fetch Successfully.",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const bookAppointment = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const appointment = new Appointment({ ...req.body });
    await appointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "new-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "user/appointments",
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "Appointment book Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const bookingAvailblity = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM--YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointment = await Appointment.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointment.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Appointments not Availibale this time",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments Availibale ",
      });
    }
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};
const userAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find({ userId: req.body.userId })
      .populate({ path: "userId", select: "name email isAdmin phone isDoctor createdAt" })
      .populate({ path: "doctorId", select: "specialization email firstName phone lastName createdAt" });
    return res.status(200).send({
      success: true,
      message: "All Appointments fetch Successfully",
      data: appointment,
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const verifyMail = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isEmailVerified: true })
    return res.status(200).send({
      success: true,
      message: "Your email verified Successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
}
module.exports = {
  userRegister,
  login,
  getUser,
  forgetPassword,
  resetPassword,
  allDoctor,
  bookAppointment,
  bookingAvailblity,
  userAppointments,
  verifyMail
};
