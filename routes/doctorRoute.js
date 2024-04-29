const router = require("express").Router();
const {
  doctorRegister,
  notification,
  deleteNotification,
  getDocInfo,
  updateDoctor,
  getDoctorById
} = require("../controllers/doctorController");
const auth = require("../middleware/auth");

router.post("/doctorRegister", auth, doctorRegister);

router.post("/get-all-notification", auth, notification);

router.post("/delete-all-notification", auth, deleteNotification);

router.post("/get-doc-info", auth, getDocInfo);

router.post("/updateDoctor", auth, updateDoctor);

router.post("/getDoctorById", auth, getDoctorById);

module.exports = router;
