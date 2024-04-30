const User = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointment");
const helper = require("../utils/helper");
const { userForgetPassword } = require("../middleware/mail");
const userRegister = async (req, res) => {
  try {
    let emailMatch = await User.findOne({
      email: req.body.email,
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
      email: req.body.email,
      password: hashedPassword,
    });
    let response = await user.save();
    delete response.password;
    return res.status(201).json({
      success: true,
      msg: "USER REGISTER SUCCESSFULLY.",
      data: response,
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
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
    const doctor = await Doctor.find({ status: "approved" });
    return res.status(200).send({
      success: true,
      message: "Doctor data fetch Successfully.",
      data: doctor,
    });
  } catch (err) {
    return res.json(
      helper.showInternalServerErrorResponse("Internal server error")
    );
  }
};

const bookAppointment = async (req, res) => {
  try {
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
module.exports = {
  userRegister,
  login,
  getUser,
  forgetPassword,
  resetPassword,
  allDoctor,
  bookAppointment,
};
